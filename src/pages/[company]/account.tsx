import { signIn, signOut, useSession } from 'next-auth/react';

import ProsePage from '../../layouts/prose';

const AccountPage = () => {
  const { data: session, status } = useSession();

  return (
    <ProsePage loading={status === "loading"}>
      {session && session.user ? (
        <div>
          <h1>{session.user.name} account page</h1>
          <p>Email: {session.user.email}</p>
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
