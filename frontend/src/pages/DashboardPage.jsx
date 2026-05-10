import { useNavigate } from 'react-router';
import { useUser } from '@clerk/react';
import { useState } from 'react';

import Navbar from '../components/Navbar';
import {
  useCreateSession,
  useActiveSessions,
  useMyRecentSessions,
} from '../hooks/useSessions';
import WelcomeSection from '../components/WelcomeSection';
import StatsCards from '../components/StatsCards';
import ActiveSessions from '../components/ActiveSessions';
import RecentSessions from '../components/RecentSessions';
import CreateSessionModal from '../components/CreateSessionModal';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: '', difficulty: '' });

  const createSessionMutation = useCreateSession();

  const { data: dataActiveSessions, isLoading: isLoadingActiveSessions } =
    useActiveSessions();
  const { data: dataMyRecentSessions, isLoading: isLoadingMyRecentSessions } =
    useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          (setShowCreateModal(false), navigate(`/session/${data.session._id}`));
        },
      },
    );
  };

  const activeSessions = dataActiveSessions?.sessions || [];
  const myRecetSessions = dataMyRecentSessions?.sessions || [];

  const isUserInSession = (session) => {
    if (!user.id) return false;
    return (
      session.host?.clerkId === user.id ||
      session.participant?.clerkId === user.id
    );
  };

  return (
    <>
      <div className='min-h-screen bg-base-300'>
        <Navbar />
        <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

        {/* Grid layout */}
        <div className='container mx-auto px-6 pb-16 lg:px-35'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <StatsCards
              activeSessionsCount={activeSessions.length}
              recentSessionsCount={myRecetSessions.length}
            />
            <ActiveSessions
              sessions={activeSessions}
              isLoading={isLoadingActiveSessions}
              isUserInSession={isUserInSession}
            />
          </div>

          <RecentSessions
            sessions={myRecetSessions}
            isLoading={isLoadingMyRecentSessions}
          />
        </div>
      </div>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isLoading}
      />
    </>
  );
};
export default DashboardPage;
