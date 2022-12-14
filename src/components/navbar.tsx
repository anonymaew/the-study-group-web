import { signIn } from 'next-auth/react';
import Link from 'next/link';

import { HomeIcon } from '@heroicons/react/24/outline';

import { useCompanyInterface } from '../lib/useCompany';
import Users from './users';

const Navbar = (props: { head: useCompanyInterface }) => {
  const { company, user, router } = props.head;

  return (
    <nav
      className="sticky top-0 left-0 z-10 h-12 w-full pr-8 text-white transition duration-200"
      style={{ backgroundColor: company?.color || "#444" }}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between">
        {company === undefined || company === null ? (
          <p className="mx-auto animate-pulse text-lg font-bold">Loading...</p>
        ) : (
          <>
            <div className="flex items-center">
              <div className="mx-4 text-lg font-bold hover:underline">
                <Link href={`/${company.id}`}>
                  <button className="h-12 px-4">
                    <span className="hidden sm:inline">{company.name}</span>
                    <HomeIcon className="inline aspect-square w-5 sm:hidden" />
                  </button>
                </Link>
              </div>
              <div
                className="group relative"
                style={{ backgroundColor: company.color }}
              >
                <button className="flex h-12 items-center px-4 transition duration-200 hover:underline hover:backdrop-brightness-75">
                  Courses ▾
                </button>
                <div
                  className="absolute left-1/2 bottom-0 -z-10 w-full -translate-x-1/2 rounded-b-md transition-transform duration-500 ease-in-out group-focus-within:translate-y-full"
                  style={{ backgroundColor: company.color }}
                >
                  <Link href={`/${company.id}/courses`}>
                    <a className="block w-full cursor-pointer py-2 text-center backdrop-brightness-90 transition duration-200 hover:backdrop-brightness-75">
                      Explore
                    </a>
                  </Link>
                  <Link href={`/${company.id}/courses?filter=enrolled`}>
                    <a className="block w-full cursor-pointer py-2 text-center backdrop-brightness-90 transition duration-200 hover:backdrop-brightness-75">
                      Enrolled
                    </a>
                  </Link>
                </div>
              </div>
              <div
                className="group relative"
                style={{ backgroundColor: company.color }}
              >
                <button className="flex h-12 items-center px-4 transition duration-200 hover:underline hover:backdrop-brightness-75">
                  Users ▾
                </button>
                <div
                  className="absolute left-1/2 bottom-0 -z-10 w-full -translate-x-1/2 rounded-b-md transition-transform duration-500 ease-in-out group-focus-within:translate-y-full"
                  style={{ backgroundColor: company.color }}
                >
                  <Link href={`/${company.id}/users?role=teacher`}>
                    <a className="block w-full cursor-pointer py-2 text-center backdrop-brightness-90 transition duration-200 hover:backdrop-brightness-75">
                      Teachers
                    </a>
                  </Link>
                  <Link href={`/${company.id}/users`}>
                    <a className="block w-full cursor-pointer py-2 text-center backdrop-brightness-90 transition duration-200 hover:backdrop-brightness-75">
                      All
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <button
              className="hover:underline"
              onClick={() => {
                user
                  ? router?.push(`/${company?.id}/account`)
                  : signIn("google");
              }}
            >
              {user === undefined ? null : user !== null ? (
                <Users data={[user]} flags={{ noName: true }} />
              ) : (
                "Log in"
              )}
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
