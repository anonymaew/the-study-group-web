import { useRouter } from 'next/router';

import ListsPage from '../../../layouts/lists';
import { trpc } from '../../../utils/trpc';

const UsersPage = () => {
  const router = useRouter();
  const { company, type } = router.query as {
    company: string;
    type?: string | null;
  };
  const { data: users, isLoading } = trpc.user.read.all.useQuery();

  return (
    <ListsPage
      loading={isLoading || users === null || users === undefined}
      data={{
        heading: "Users",
        items:
          users
            ?.map((user) => ({
              id: user.id.toString(),
              name: user.name,
              link: `/${company}/users/${user.id}`,
            }))
            .filter((user) => {
              if (type === null || type == undefined) return true;
              return user.name.toLowerCase().includes(type.toLowerCase());
            }) || [],
      }}
    ></ListsPage>
  );
};

export default UsersPage;
