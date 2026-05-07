import {
  Show,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from '@clerk/react';
import toast from 'react-hot-toast';

// import axiosInstance from '../lib/axios';

const HomePage = () => {
  // await axiosInstance.get("session/123")
  return (
    <div>
      <h1 className='text-red-500 bg-orange-400 p-10 text-3xl'>
        Welcome to CodeMeet
      </h1>
      <br />
      <button
        className='btn btn-primary'
        onClick={() => toast.success('succest toast')}
      >
        click me
      </button>

      <Show when='signed-out'>
        <SignInButton />
      </Show>

      <Show when='signed-in'>
        <SignOutButton />
      </Show>

      <UserButton />
    </div>
  );
};
export default HomePage;
