import { useRouter } from 'next/router';

import { Page, User } from '@prisma/client';

import ItemsPage from '../../../layouts/items';
import { trpc } from '../../../utils/trpc';

const UsersPage = () => {
  const router = useRouter();
  const { company, role } = router.query as {
    company: string;
    role?: string | null;
  };
  const { data: users, isLoading } = trpc.user.read.all.useQuery();

  return (
    <ItemsPage
      loading={isLoading || users === null || users === undefined}
      heading={"Users"}
      items={
        users === undefined
          ? []
          : users
              .filter(
                (user): user is User & { description: NonNullable<Page> } =>
                  user.description !== null
              )
              .map((user, index) => ({
                ...user.description,
                name: user.name,
                link: `/${company}/users/${user.id.slice(-6)}`,
                authors: [],
              }))
      }
      layout={"lists"}
    ></ItemsPage>
  );
};

export default UsersPage;
