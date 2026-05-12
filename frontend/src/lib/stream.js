import { StreamVideoClient } from '@stream-io/video-react-sdk';

const apiKey = import.meta.env.VITE_STREAM_API_KEY;
let client = null;

export const initializeStreamClient = async (user, token) => {
  if (client && client?.user?.id === user.id) return client;

  if (client) {
    await disconnectStreamClient();
  }

  if (!apiKey) throw new Error('Stream API key is not provided.');

  client = StreamVideoClient.getOrCreateInstance({
    apiKey,
    user,
    token,
  });

  return client;
};

export const disconnectStreamClient = async () => {
  if (!client) return; // 没有实例直接返回，无需 try 包裹整个流程

  try {
    await client.disconnectUser(); // 直接用模块级 client，无遮蔽问题
    client.destroy();
  } catch (error) {
    console.error('Error disconnecting Stream client:', error);
  } finally {
    client = null; // 无论成败都清空，保证下次初始化是干净状态
  }
};