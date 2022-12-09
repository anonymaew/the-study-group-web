import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { HomeIcon } from '@heroicons/react/24/outline';
import { MainCompany } from '@prisma/client';

import { trpc } from '../utils/trpc';
import Users from './users';

const Navbar = () => {
  const router = useRouter();
  const { company: companyId, courseId } = router.query;
  const { data: session, status } = useSession();

  const { data: company, isLoading } = trpc.company.read.one.useQuery({
    id: companyId as string,
  });
  const { data: user } = trpc.user.read.one.useQuery({
    id: session?.user?.id || "",
  });

  return (
    <nav
      className="sticky top-0 left-0 z-10 h-12 w-full pr-8 text-white transition duration-200"
      style={{ backgroundColor: company?.color || "#444" }}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between">
        {isLoading ? (
          <p className="mx-auto animate-pulse text-lg font-bold">Loading...</p>
        ) : (
          <>
            <div className="flex items-center">
              <div className="mx-4 text-lg font-bold hover:underline">
                <Link href={`/${companyId}`}>
                  <button className="h-12 px-4">
                    <span className="hidden sm:inline">
                      {company?.name || ""}
                    </span>
                    <HomeIcon className="inline aspect-square w-5 sm:hidden" />
                  </button>
                </Link>
              </div>
              <div
                className="group relative"
                style={{ backgroundColor: company?.color || "#444" }}
              >
                <button className="flex h-12 items-center px-4 transition duration-200 hover:underline hover:backdrop-brightness-75">
                  Courses ▾
                </button>
                <div
                  className="absolute left-1/2 bottom-0 -z-10 w-full -translate-x-1/2 rounded-b-md transition-transform duration-500 ease-in-out group-focus-within:translate-y-full"
                  style={{ backgroundColor: company?.color || "#444" }}
                >
                  <Link href={`/${companyId}/courses`}>
                    <a className="block w-full cursor-pointer py-2 text-center backdrop-brightness-90 transition duration-200 hover:backdrop-brightness-75">
                      Explore
                    </a>
                  </Link>
                  <Link href={`/${companyId}/courses?filter=enrolled`}>
                    <a className="block w-full cursor-pointer py-2 text-center backdrop-brightness-90 transition duration-200 hover:backdrop-brightness-75">
                      Enrolled
                    </a>
                  </Link>
                </div>
              </div>
              <div
                className="group relative"
                style={{ backgroundColor: company?.color || "#444" }}
              >
                <button className="flex h-12 items-center px-4 transition duration-200 hover:underline hover:backdrop-brightness-75">
                  Users ▾
                </button>
                <div
                  className="absolute left-1/2 bottom-0 -z-10 w-full -translate-x-1/2 rounded-b-md transition-transform duration-500 ease-in-out group-focus-within:translate-y-full"
                  style={{ backgroundColor: company?.color || "#444" }}
                >
                  <Link href={`/${companyId}/users?role=teacher`}>
                    <a className="block w-full cursor-pointer py-2 text-center backdrop-brightness-90 transition duration-200 hover:backdrop-brightness-75">
                      Teachers
                    </a>
                  </Link>
                  <Link href={`/${companyId}/users`}>
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
                status === "authenticated" && user
                  ? router.push(`/${companyId}/account`)
                  : signIn("google");
              }}
            >
              {status === "authenticated" && user ? (
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
