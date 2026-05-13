import { StreamVideoClient, setLogLevel } from '@stream-io/video-react-sdk';
import { StreamChat } from 'stream-chat';

//  将 Stream Video SDK 日志级别设为 error，屏蔽所有 warning/info
setLogLevel('error');

const apiKey = import.meta.env.VITE_STREAM_API_KEY;
let client = null;

//带指数退避的重试
async function retry(fn, { maxRetries = 2, baseDelay = 2000, label = '' } = {}) {
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      // 最后一次重试也失败了，抛出
      if (i === maxRetries) throw error;
      
      // 只有网络错误才值得重试，鉴权错误直接抛
      if (error?.message?.includes('4xx') || error?.code === 'TOKEN_INVALID') {
        throw error;
      }
      
      const delay = baseDelay * Math.pow(2, i);
      console.warn(`[${label}] 第 ${i + 1} 次重试，${delay}ms 后重试`, error.message);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

export const initializeStreamClient = async (user, token) => {
  // 同一用户且客户端仍然存活，直接复用
  if (client && client?.user?.id === user.id) return client;

  // 有旧实例先断开
  if (client) {
    await disconnectStreamClient();
  }

  if (!apiKey) throw new Error('Stream API key is not provided.');

  //  用 new 而非 getOrCreateInstance，避免 SDK 内部单例干扰
  client = await retry(
    () =>
      new StreamVideoClient({
        apiKey,
        user,
        token,
        options: {
          timeout: 10000,
        },
      }),
    { maxRetries: 2, baseDelay: 2000, label: 'StreamVideo' }
  );

  return client;
};

export const disconnectStreamClient = async () => {
  if (!client) return;

  try {
    await client.disconnectUser(); //  只调用一次，且有 await
  } catch (error) {
    console.error('Error disconnecting Stream client:', error);
  } finally {
    client = null;
  }
};
