import type { NextPage } from "next";
import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

const HomeButton = (props: { children?: ReactNode; to: string }) => {
  return (
    <button className="col-1 m-4 rounded-3xl bg-[url('/cover.jpg')] bg-cover bg-center transition duration-200 ease-in-out hover:scale-105 focus:outline-none focus-visible:outline focus-visible:outline-4 focus-visible:outline-purple-500">
      <Link href={`/${props.to}`}>
        <div className="flex h-full w-full items-center justify-center rounded-3xl backdrop-brightness-50 transition duration-200 ease-in-out hover:backdrop-brightness-[.25]">
          <div className="m-2 my-8 sm:my-16">{props.children}</div>
        </div>
      </Link>
    </button>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Study Group</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex min-h-screen items-center justify-center bg-white dark:bg-zinc-900">
        <div className="grid w-full max-w-4xl grid-flow-row text-3xl font-bold text-white sm:px-6 ">
          <div className="grid p-3 sm:grid-cols-1">
            <HomeButton to="tsg">
              <p className="my-6 sm:my-12">The Study Group</p>
            </HomeButton>
          </div>
          <div className="grid p-3 sm:grid-cols-1">
            <HomeButton to="jic">JIC</HomeButton>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
