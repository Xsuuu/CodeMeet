import { clerkMiddleware, getAuth, clerkClient } from '@clerk/express'; // 引入 clerkClient
import User from '../models/User.js';

export const protectRoute = [
  clerkMiddleware(),
  async (req, res, next) => {
    try {
      const { userId: clerkId } = getAuth(req);
      if (!clerkId) return res.status(401).json({ msg: 'Unauthorized' });

      //查数据库
      let user = await User.findOne({ clerkId });

      // 如果数据库没人，说明 Webhook 还没跑完
      if (!user) {
        console.log(`🔎 发现数据库无记录，正在为 ${clerkId} 紧急同步...`);

        const clerkUser = await clerkClient.users.getUser(clerkId);

        user = await User.findOneAndUpdate(
          { clerkId },
          {
            $set: {
              clerkId,
              email: clerkUser.emailAddresses[0]?.emailAddress,
              name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
              profileImage: clerkUser.imageUrl,
            },
          },
          { upsert: true, new: true },
        );

        // 同步到 Stream
        // 注意：Stream 的 ID 必须是字符串，且不能包含特殊字符（Clerk ID 通常是安全的）
        try {
          await upsertStreamUser({
            id: clerkId,
            name: userData.name,
            image: userData.profileImage,
          });
          console.log(`✅ Stream 同步成功: ${clerkId}`);
        } catch (streamError) {
          // 这里我们捕获 Stream 错误但不阻断主流程，防止因为 Stream 抖动导致用户登不进系统
          console.error('❌ Stream 同步失败，但已完成数据库写入:', streamError);
        }
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Error in protectRoute:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
];
