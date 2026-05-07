import { Routes, Route, Navigate } from 'react-router';
import { useUser } from '@clerk/react';
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/HomePage';
import ProblemsPage from './pages/ProblemsPage';

function App() {
  const { isSignedIn, isLoaded } = useUser;

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/problems'
          element={ !isLoaded ? null : isSignedIn ? <ProblemsPage /> : <Navigate to={'/'} />}
        />
      </Routes>
      <Toaster position='top-center' toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;

//tw, daisyui, react-router, react-hot-toast,
//todo:react-query aka tanstack query, axios
//! ddddddddddd
//? dddddddddd
//* dddddddddd
