import { useRouter } from 'next/router';

import Users from '../../../components/users';
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
            ?.filter(
              (user) =>
                type !== null &&
                type !== undefined &&
                user.role === type.toUpperCase()
            )
            .map((user) => <Users data={[user]} />) || [],
      }}
    ></ListsPage>
  );
};

export default UsersPage;
