import { streamClient, chatClient } from '../lib/stream.js';
import Session from '../models/Session.js';
import { randomUUID } from 'crypto';

export async function createSession(req, res) {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id; //mongoDB自动生成的id
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty) {
      return res
        .status(400)
        .json({ message: 'Problem and difficulty are required' });
    }

    //generate a unique call id for stream video
    const callId = `session_${randomUUID()}`;

    //create session in db
    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    //create stream video call
    await streamClient.video.call('default', callId).getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: { problem, difficulty, sessionId: session._id.toString() },
      },
    });

    //chat messaging
    const channel = chatClient.channel('messaging', callId, {
      name: `${problem} Session`,
      created_by_id: clerkId,
      members: [clerkId],
    });
    await channel.create();

    res.status(201).json({ session: session });
  } catch (error) {
    if (session?._id) {
      await Session.findByIdAndDelete(session._id);
    }
    console.error('Error in createSession controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function getActiveSessions(_, res) {
  //没有使用args用_跳过
  try {
    const sessions = await Session.find({ status: 'active' })
      .populate('host', 'name profileImage email clerkId')
      .sort({ createdAt: -1 })
      .limit(20);
    //createAt是mongoDB创建的时间戳timestamps，-1降序排列

    res.status(200).json({ sessions });
  } catch (error) {
    console.error('Error in getActiveSessions controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function getMyRecentSessions(req, res) {
  try {
    const userId = req.user._id;

    //get sessions where user is either host or participant
    const sessions = await Session.find({
      status: 'completed',
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (error) {
    console.error('Error in getMyRecentSessions controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function getSessionById(req, res) {
  try {
    const { id } = req.params;
    // URL: /api/session/abc123?search=easy
    // Body: { problem: "Two Sum" }

    //req.params.id; // → "abc123"   URL路径里的动态部分
    //req.query.search; // → "easy"     URL问号后面的参数
    //req.body.problem; // → "Two Sum"  前端发过来的请求体数据

    const session = await Session.findById(id)
      .populate('host', 'name email profileImage clerkId')
      .populate('participant', 'name email profileImage clerkId');

    if (!session) return res.status(404).json({ message: 'Session not found' });

    res.status(200).json({ session });
  } catch (error) {
    console.error('Error in getSessionById controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findOneAndUpdate(
      { _id: id, participant: null },
      { participant: userId },
      { new: true },
    );

    if (!session) return res.status(404).json({ message: 'Session not found' });

    session.participant = userId;
    await session.save();

    const channel = chatClient.channel('messaging', session.callId);
    await channel.addMembers([clerkId]); //方法都在stream里面的文档js的channel分类中

    res.status(200).json({ session });
  } catch (error) {
    console.error('Error in joinSession controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function endSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    //check if user is the host
    if (session.host.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: 'Only the host can end the session' });
    }

    //check if session is already completed
    if (session.status === 'completed') {
      return res.status(400).json({ message: 'Session is already completed' });
    }
    // res.status(200) // 成功
    // res.status(201) // 创建成功（比如 create 用这个）
    // res.status(400) // 请求错误（前端传的数据有问题）
    // res.status(401) // 未登录
    // res.status(403) // 没有权限
    // res.status(404) // 找不到
    // res.status(500) // 服务器内部错误

    session.status = 'completed';
    await session.save();

    //delete stream video call
    const call = streamClient.video.call('default', session.callId);
    await call.delete({ hard: true }); //强制删除

    //delete stream chat channel
    const channel = chatClient.channel('messaging', session.callId);
    await channel.delete();

    res.status(200).json({ session, message: 'Session ended successfully' });
  } catch (error) {
    console.error('Error in endSession controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  //代码行太多的话可以用express-async-handler包裹，而不是用try-catch
}
