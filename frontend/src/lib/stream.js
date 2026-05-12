import { StreamVideoClient } from '@stream-io/video-react-sdk';

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

// 初始化 Stream client
export const initializeStreamClient = async (user, token) => {
  if (!apiKey) throw new Error('Stream API key is not provided.');

  // SDK 自己管理单例，不需要再自己维护 client
  const client = StreamVideoClient.getOrCreateInstance({
    apiKey,
    user,
    token,
  });

  return client;
};

// 断开连接
export const disconnectStreamClient = async () => {
  try {
    // 直接让 SDK 内部单例断开
    const client = StreamVideoClient.getInstance();
    if (client) {
      await client.disconnectUser();
      // 可选：销毁内部单例，确保下一次初始化是干净的
      client.destroy(); 
    }
  } catch (error) {
    console.error('Error disconnecting Stream client:', error);
  }
};