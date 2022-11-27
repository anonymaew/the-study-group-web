import { signIn, signOut, useSession } from 'next-auth/react';

import ProsePage from '../layouts/prose';

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
        <button
          onClick={() => {
            signIn("google");
          }}
        >
          Login with Google
        </button>
      )}
    </ProsePage>
  );
};

export default AccountPage;
