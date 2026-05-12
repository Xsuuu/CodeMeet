import { useState, useEffect, useRef } from 'react';
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
  const callRef = useRef(null);
  const chatClientRef = useRef(null);

  useEffect(() => {
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

        const videoCall = client.call('default', session.callId);
        callRef.current = videoCall;
        await videoCall.join({ create: true });

        if (!isActive) return;
        setCall(videoCall);

        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        const chatClientInstance = StreamChat.getInstance(apiKey);
        chatClientRef.current = chatClientInstance;

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
        setStreamClient(null);
        setCall(null);
        setChatClient(null);
        setChannel(null);
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
        if (callRef.current) {
          await callRef.current.leave();
          callRef.current = null;
        }
        if (chatClientRef.current) {
          await chatClientRef.current.disconnectUser();
          chatClientRef.current = null;
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
