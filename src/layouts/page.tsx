import { useEffect, useState } from 'react';

import { Page, User } from '@prisma/client';

import RichTextEditor from '../components/editor';
import Users from '../components/users';
import { useCourseInterface } from '../lib/useCourse';
import ProsePage from './prose';

const Page = (props: {
  head: useCourseInterface;
  data?: (Page & { authors: User[] }) | null;
  children?: React.ReactNode;
  write?: {
    edit?: (content: string) => void;
  };
}) => {
  const [page, setPage] = useState<Page | null | undefined>(props.data);

  useEffect(() => {
    setPage(props.data);
  }, [props.data]);

  return (
    <ProsePage head={props.head} contentLoading={props.data === undefined}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 border-b border-zinc-500 pb-8">
          <div className="mx-auto mb-8 aspect-video max-w-xl bg-zinc-500 text-center"></div>
          <h1 className="text-center">
            {props.data?.name || "Some header title"}
          </h1>
          <div className="text-center">
            <Users data={props.data?.authors || []} />
          </div>
          <div className="flex flex-row flex-wrap items-center justify-center">
            <span className="mx-8 py-4">
              {`Created at: ${props.data?.createdAt.toLocaleString("en-US", {
                timeZone: "Asia/Bangkok",
              })}`}
            </span>
          </div>
        </div>
        {page !== undefined && (
          <RichTextEditor
            content={page?.detail || "(empty)"}
            writable={props.head.course?.write || false}
            save={(content) => {
              if (props.write?.edit) props.write.edit(content);
            }}
          />
        )}
      </div>
    </ProsePage>
  );
};

export default Page;
