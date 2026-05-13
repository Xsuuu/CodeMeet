import { useState, useEffect, useRef } from 'react';
import { StreamChat } from 'stream-chat';
import toast from 'react-hot-toast';
import { initializeStreamClient } from '../lib/stream';
import { sessionApi } from '../api/session';

//  模块级 Promise，确保上一次 cleanup 完成后再开始下一次初始化
// 防止旧 call 未 leave 时摄像头被占用（NotReadableError: Device in use）
let pendingCleanup = Promise.resolve();

function useStreamClient(session, loadingSession, isHost, isParticipant) {
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);
  const callRef = useRef(null);
  const chatClientRef = useRef(null);

  useEffect(() => {
    let isActive = true;

    const initCall = async () => {
      if (!session?.callId) return;
      if (!isHost && !isParticipant) return;
      if (session.status === 'completed') return;

      //  等上一次 cleanup 结束，防止摄像头/麦克风设备未释放就被新实例抢占
      await pendingCleanup;
      if (!isActive) return;

      try {
        const { token, userId, userName, userImage } =
          await sessionApi.getStreamToken();

        if (!isActive) return;

        const client = await initializeStreamClient(
          { id: userId, name: userName, image: userImage },
          token,
        );

        if (!isActive) return;
        setStreamClient(client);

        const videoCall = client.call('default', session.callId);

        try {
          await videoCall.join({ create: true });
          if (!isActive) return;
          callRef.current = videoCall;
          setCall(videoCall);

          if (!isHost) {
            const unsubscribe = videoCall.on('call.ended', () => {
              toast.error('The host has ended the session.' );
            });
            // 把取消订阅存起来，cleanup 时调用
            callRef._unsubscribeEnded = unsubscribe;
          }
        } catch (joinError) {
          try {
            await videoCall.leave();
          } catch (_) {}
          toast.error('Failed to join video call');
          return; // join 失败立即终止，不继续初始化 chat（之前缺少这一行）
        }

        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        const chatClientInstance = new StreamChat(apiKey, {
          timeout: 30000, // 延长到 10 秒
        });
        chatClientRef.current = chatClientInstance;

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

      const callToLeave = callRef.current;
      const chatToDisconnect = chatClientRef.current;
      callRef.current = null;
      chatClientRef.current = null;

      // 将清理过程存入 pendingCleanup，供下一次 initCall await
      pendingCleanup = (async () => {
        try {
          if (callToLeave) {
            // 检查 callingState，避免对已离开的 call 重复调用 leave()
            // 防止 React StrictMode 双次 cleanup 触发 "already been left" 错误
            const callingState = callToLeave.state?.callingState;
            if (
              callingState &&
              callingState !== 'left' &&
              callingState !== 'idle'
            ) {
              await callToLeave.leave();
            }
          }
        } catch (err) {
          //  过滤误报：仅对非"已离开"的真实错误弹出 toast
          if (!err?.message?.includes('already been left')) {
            toast.error('Sorry, this session has been disbanded by the host.');
          }
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
