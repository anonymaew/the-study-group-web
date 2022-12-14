import { useEffect, useState } from 'react';

import { Page, User } from '@prisma/client';

import Editor from '../components/editor';
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
  const [pageDetail, setPageDetail] = useState<string>(
    props.data?.detail || ""
  );
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    if (props.data) setPageDetail(props.data?.detail || "");
  }, [props.data]);

  useEffect(() => {
    console.log("pageDetail", pageDetail);
  }, [pageDetail]);

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
          <div className="flex items-center justify-center">
            {props.head.course?.write && props.write?.edit && (
              <button
                className="w-48 rounded-md bg-amber-500 p-2 transition duration-200 ease-in-out hover:bg-amber-600"
                onClick={() => setEdit(!edit)}
              >{`Switch to ${edit ? "preview" : "edit"} mode`}</button>
            )}
          </div>
        </div>
        {edit ? (
          <Editor
            content={pageDetail}
            setContent={setPageDetail}
            save={() => {
              console.log("page", pageDetail);
              props.write?.edit?.(pageDetail);
            }}
          />
        ) : (
          <div
            className="no-prose"
            dangerouslySetInnerHTML={{ __html: pageDetail }}
          ></div>
        )}
      </div>
    </ProsePage>
  );
};

export default Page;
