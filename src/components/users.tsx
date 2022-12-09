import Link from 'next/link';
import { useEffect } from 'react';

import { User } from '@prisma/client';

const Users = (props: {
  data: User[];
  flags?: {
    noIcon?: boolean;
    noName?: boolean;
  };
}) => {
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
              onError={(e) => {
                e.currentTarget.src = "/gray.jpeg";
              }}
            ></img>
          ) : (
            <span className="my-0 inline-block aspect-square w-9 rounded-full bg-zinc-300"></span>
          )}
        </span>
      ))}
      {props.flags?.noName !== true &&
        props.data.map((user, index) => {
          return (
            <span key={index}>
              <span className="whitespace-nowrap hover:underline">
                <Link href={`/${user.companyId}/users/${user.id.slice(-6)}`}>
                  {user.name}
                </Link>
              </span>
              {index !== props.data.length - 1 && <span>, </span>}
            </span>
          );
        })}
    </span>
  );
};

export default Users;
