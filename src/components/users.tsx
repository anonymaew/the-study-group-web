import Link from 'next/link';

import { User } from '@prisma/client';

const Users = (props: { data: User[] }) => {
  return (
    <span className="">
      {props.data.map((user, index) => (
        <span className="mr-2" key={index}>
          {user.image ? (
            <img
              className="my-0 inline aspect-square w-9 rounded-full"
              src={user.image}
              alt={user.name}
              referrerPolicy="no-referrer"
            ></img>
          ) : (
            <span className="my-0 aspect-square w-9 rounded-full bg-gray-300"></span>
          )}
        </span>
      ))}
      {props.data.map((user, index) => {
        return (
          <>
            <span className="whitespace-nowrap" key={index}>
              <Link href={`/${user.companyId}/users/${user.id.slice(-6)}`}>
                {user.name}
              </Link>
            </span>
            {index !== props.data.length - 1 && <span>, </span>}
          </>
        );
      })}
    </span>
  );
};

export default Users;
