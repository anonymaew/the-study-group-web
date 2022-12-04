import Link from 'next/link';

import { User } from '@prisma/client';

const Users = (props: { data: User[] }) => {
  return (
    <span className="flex items-center">
      <>
        {props.data.map((user) => (
          <span className="mr-4 inline-block aspect-square w-12 rounded-full bg-zinc-500"></span>
        ))}
        {props.data.map((user) => {
          <Link href={`/users/${user.id}`}>
            <a>{user.name}</a>
          </Link>;
        })}
      </>
    </span>
  );
};

export default Users;
