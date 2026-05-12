import { useState, useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import toast from 'react-hot-toast';
import { initializeStreamClient, disconnectStreamClient } from '../lib/stream';
import { sessionApi } from '../api/session';

function useStreamClient(session, loadingSession, isHost, isParticipant) {
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);

  useEffect(() => {
    let videoCall = null;
    let chatClientInstance = null;
    let isActive = true; // ← 防止 cleanup 后还在执行

    const initCall = async () => {
      if (!session?.callId) return;
      if (!isHost && !isParticipant) return;
      if (session.status === 'completed') return;

      try {
        const { token, userId, userName, userImage } =
          await sessionApi.getStreamToken();

        if (!isActive) return; // ← 如果已经 cleanup，停止

        const client = await initializeStreamClient(
          { id: userId, name: userName, image: userImage },
          token,
        );

        if (!isActive) return;
        setStreamClient(client);

        videoCall = client.call('default', session.callId);
        await videoCall.join({ create: true });

        if (!isActive) return;
        setCall(videoCall);

        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        chatClientInstance = StreamChat.getInstance(apiKey);

        // connectUser 之前检查是否已经连接
        if (chatClientInstance.userID) {
          await chatClientInstance.disconnectUser();
        }

        await chatClientInstance.connectUser(
          { id: userId, name: userName, image: userImage },
          token,
        );

        if (!isActive) return;
        setChatClient(chatClientInstance);

        const chatChannel = chatClientInstance.channel(
          'messaging',
          session.callId,
        );
        await chatChannel.watch();

        if (!isActive) return;
        setChannel(chatChannel);
      } catch (error) {
        if (!isActive) return;
        toast.error('Failed to join video call');
        console.error('Error init call', error);
      } finally {
        if (isActive) setIsInitializingCall(false);
      }
    };

    if (session && !loadingSession) initCall();

    return () => {
      isActive = false;
      (async () => {
        try {
          if (videoCall) {
            try {
              await videoCall.leave();
            } catch (leaveError) {
              // 已经离开了就忽略，不需要打印
              if (!leaveError.message?.includes('already been left')) {
                console.error('Leave error:', leaveError);
              }
            }
          }
          if (chatClientInstance) {
            await chatClientInstance.disconnectUser();
          }
          await disconnectStreamClient();
        } catch (error) {
          console.error('Cleanup error:', error);
        }
      })();
    };

    // 用基础值，不用整个对象
  }, [
    session?._id,
    session?.callId,
    session?.status,
    loadingSession,
    isHost,
    isParticipant,
  ]);

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
}

export default useStreamClient;
