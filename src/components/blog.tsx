import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import { Page, User } from '@prisma/client';

import Users from './users';

const Blog = (props: { data: Page; authors: User[]; writable: boolean }) => {
  return (
    <>
      <h1 className="text-center">{props.data.name}</h1>
      <div className="text-center">
        <Users data={props.authors} />
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center pb-8">
        <span className="mx-8 py-4">
          Created at:{" "}
          {props.data.createdAt.toLocaleString("en-US", {
            timeZone: "Asia/Bangkok",
          })}
        </span>
      </div>
      <button className="mx-auto block w-full max-w-lg rounded-lg bg-green-700 p-2 px-4 font-bold text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-green-800">
        Pay 100 THB to enroll
      </button>
      <h2>Description:</h2>
      <ReactMarkdown>{props.data.detail || "(no description)"}</ReactMarkdown>
    </>
  );
};

export default Blog;
