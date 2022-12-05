import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

import ProsePage from '../../../layouts/prose';
import { trpc } from '../../../utils/trpc';

const UserPage = () => {
  const router = useRouter();
  const { userId } = router.query as { userId: string };
  const { data: user, isLoading } = trpc.user.read.one.useQuery({
    id: userId,
  });

  return (
    <ProsePage loading={isLoading || user === undefined || user === null}>
      <div className="mx-auto my-8 aspect-square w-48 rounded-full bg-zinc-500">
        {user?.image && (
          <img
            className="w-full rounded-full"
            src={user.image}
            alt={user.name}
            referrerPolicy="no-referrer"
          ></img>
        )}
      </div>
      <h1 className="text-center">{user?.name}</h1>
      <p className="text-center">
        {user?.role && (
          <span className="rounded-md bg-indigo-800 p-2 font-bold">
            {user.role[0] + user.role.slice(1).toLowerCase()}
          </span>
        )}
      </p>
      <h2>Description</h2>
      <ReactMarkdown>{user?.details || "empty"}</ReactMarkdown>
    </ProsePage>
  );
};

export default UserPage;
