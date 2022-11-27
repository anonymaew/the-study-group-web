import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

import ProsePage from '../../../layouts/prose';
import { trpc } from '../../../utils/trpc';

const CoursePage = () => {
  const router = useRouter();
  const { company, courseId } = router.query;
  const { data: course, isLoading } = trpc.course.read.one.useQuery({
    id: courseId as string,
  });

  return (
    <ProsePage loading={course === undefined || course === null}>
      <div className="mx-auto my-8 aspect-video max-w-xl bg-zinc-500 text-center"></div>
      <h1 className="text-center">{course?.page.name}</h1>
      <div className="flex flex-row flex-wrap items-center justify-center pb-8">
        <span className="mx-8 flex items-center">
          <span className="mr-4 inline-block aspect-square w-12 rounded-full bg-zinc-500"></span>
          <Link
            href={`/${company}/users/${course?.TeacherEnrollment[0]?.teacherId}`}
          >
            <a>{course?.TeacherEnrollment[0]?.teacher.name}</a>
          </Link>
        </span>
        <span className="mx-8 py-4">
          Created at:{" "}
          {course?.createdAt.toLocaleString("en-US", {
            timeZone: "Asia/Bangkok",
          })}
        </span>
      </div>
      <button className="mx-auto block w-full max-w-lg rounded-lg bg-green-700 p-2 px-4 font-bold text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-green-800">
        Pay 100 THB to enroll
      </button>
      <h2>Description:</h2>
      <ReactMarkdown>{course?.page.detail || "(no description)"}</ReactMarkdown>
    </ProsePage>
  );
};

export default CoursePage;
