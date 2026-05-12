import { useQuery, useMutation } from '@tanstack/react-query'; //前者查，后者增删改
import toast from 'react-hot-toast';
import { sessionApi } from '../api/session';

export const useCreateSession = () => {
  const result = useMutation({
    mutationKey: ['createSession'],
    mutationFn: sessionApi.createSession,
    onSuccess: () => toast.success('Session created successfullly!'),
    onError: (error) =>
      toast.error(error.response?.data?.message || 'Failed to create room'),
  });

  return result;
};

export const useActiveSessions = () => {
  const result = useQuery({
    queryKey: ['activeSessions'],
    queryFn: sessionApi.getActiveSessions,
  });

  return result;
};

export const useMyRecentSessions = () => {
  const result = useQuery({
    queryKey: ['myRecentSessions'],
    queryFn: sessionApi.getMyRecentSessions,
  });

  return result;
};

export const useSessionbById = (id) => {
  const result = useQuery({
    queryKey: ['session', id],
    queryFn: () => sessionApi.getSessionById(id),
    enable: !!id, //把任意值转换成布尔值
    refetchInterval: 5000, //refetch every 5 seconds to detect session status changes
  });

  return result;
};

export const useJoinSession = () => {
  const result = useMutation({
    mutationKey: ['joinSession'],
    queryFn: sessionApi.joinSession,
    onSuccess: () => toast.success('Join session successfullly!'),
    onError: () =>
      toast.error(error.response?.data?.message || 'Failed to join session'),
  });

  return result;
};

export const useEndSession = () => {
  const result = useMutation({
    mutationKey: ['endSession'],
    mutationFn: sessionApi.endSession,
    onSuccess: () => toast.success('End session successfullly!'),
    onError: (error) =>
      toast.error(error.response?.data?.message || 'Failed to end session'),
  });

  return result;
};
