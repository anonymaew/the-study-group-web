import Link from 'next/link';

import { User } from '@prisma/client';

const Users = (props: { data: User[] }) => {
  return (
    <span className="flex items-center">
      <>
        {props.data.map((user, index) => (
          <span
            className="mr-4 inline-block aspect-square w-12 rounded-full bg-zinc-500"
            key={index}
          ></span>
        ))}
        {props.data.map((user, index) => {
          <Link key={index} href={`/users/${user.id}`}>
            <a>{user.name}</a>
          </Link>;
        })}
      </>
    </span>
  );
};

export default Users;
