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
  const cleanupVersionRef = useRef(0);

  useEffect(() => {
    let isActive = true; // ← 防止 cleanup 后还在执行
    const currentVersion = cleanupVersionRef.current;

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

        try {
          await videoCall.join({ create: true }); // 等 join 成功
          if (!isActive) return;

          callRef.current = videoCall; // 成功后再设置 ref
          setCall(videoCall);
        } catch (joinError) {
          console.error('Failed to join video call:', joinError);
           toast.error('Failed to join video call');
          // Optionally: throw joinError; // to abort entire initialization
        }

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
        callRef.current = null;
        chatClientRef.current = null;
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
        const callToLeave = callRef.current;
        const chatToDisconnect = chatClientRef.current;
        callRef.current = null;
        chatClientRef.current = null;

        try {
          if (callToLeave) {
            await callToLeave.leave();
          }
        } catch (err) {
          toast.error("Sorry, this session has been disbanded by the host.");
          console.error('Error leaving call:', err);
        }

        try {
          if (chatToDisconnect) {
            await chatToDisconnect.disconnectUser();
          }
        } catch (err) {
          console.error('Error disconnecting chat:', err);
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
