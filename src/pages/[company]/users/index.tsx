import { useRouter } from 'next/router';

import ListsPage from '../../../layouts/lists';
import { trpc } from '../../../utils/trpc';

const UsersPage = () => {
  const router = useRouter();
  const { company } = router.query as { company: string };
  const { data: users, isLoading } = trpc.user.read.all.useQuery();

  return (
    <ListsPage
      loading={isLoading || users === null || users === undefined}
      data={{
        heading: "Users",
        items:
          users?.map((teacher) => ({
            id: teacher.id.toString(),
            name: teacher.name,
            link: `/${company}/users/${teacher.id}`,
          })) || [],
      }}
    ></ListsPage>
  );
};

export default UsersPage;
