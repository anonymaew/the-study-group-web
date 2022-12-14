import { signIn, signOut } from 'next-auth/react';

import ProsePage from '../../layouts/prose';
import useCompany from '../../lib/useCompany';

const AccountPage = () => {
  const head = useCompany();
  const { user: userData } = head;

  return (
    <ProsePage head={head} contentLoading={userData === undefined}>
      {userData ? (
        <div>
          <h1>{userData.name} account page</h1>
          <p>Email: {userData.email}</p>
          <button
            onClick={() => {
              signOut();
            }}
          >
            Log out
          </button>
        </div>
      ) : (
        // sign in with google button
        <button
          onClick={() => {
            signIn("google");
          }}
          className="mx-auto block w-48 rounded-md border border-gray-500 p-2 duration-200 ease-in-out hover:scale-105"
        >
          Sign in with Google
        </button>
      )}
    </ProsePage>
  );
};

export default AccountPage;
