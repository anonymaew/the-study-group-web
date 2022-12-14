import { Page, User } from '@prisma/client';

import ItemsPage from '../../../layouts/items';
import useCompany from '../../../lib/useCompany';
import { trpc } from '../../../utils/trpc';

const UsersPage = () => {
  const data = useCompany();
  const { data: users, isLoading: usersLoading } =
    trpc.user.read.all.useQuery();

  return (
    <ItemsPage
      head={data}
      heading={"Users"}
      items={
        users === undefined
          ? []
          : users
              .filter(
                (user): user is User & { description: NonNullable<Page> } =>
                  user.description !== null
              )
              .map((user) => ({
                ...user.description,
                name: user.name,
                link: `/${data.company?.id}/users/${user.id.slice(-6)}`,
                authors: [],
              }))
      }
      contentLoading={usersLoading}
      layout={"lists"}
    ></ItemsPage>
  );
};

export default UsersPage;
