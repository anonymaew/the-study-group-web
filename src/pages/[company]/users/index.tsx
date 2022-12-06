import { useRouter } from 'next/router';

import Users from '../../../components/users';
import ListsPage from '../../../layouts/lists';
import { trpc } from '../../../utils/trpc';

const UsersPage = () => {
  const router = useRouter();
  const { role } = router.query as {
    role?: string | null;
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
                role !== null &&
                role !== undefined &&
                user.role === role.toUpperCase()
            )
            .map((user, index) => <Users data={[user]} key={index} />) || [],
      }}
    ></ListsPage>
  );
};

export default UsersPage;
