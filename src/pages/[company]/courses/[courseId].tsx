import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { Company, Course } from '@prisma/client';

import { getCourse } from '../../../constant/courses';
import { getTeacher } from '../../../constant/teachers';
import ProsePage from '../../../layouts/prose';

const CoursePage = () => {
  const router = useRouter();
  const { company, courseId } = router.query;
  const [course, setCourse] = useState<Course>(getCourse(0, "THE_STUDY_GROUP"));

  useEffect(() => {
    if (courseId !== undefined && company !== undefined)
      setCourse(
        getCourse(
          parseInt(courseId as string),
          (company as string).toUpperCase().replace("-", "_") as Company
        )
      );
  }, [courseId, company]);

  return (
    <ProsePage loading={course === undefined || course === null}>
      <div className="mx-auto my-8 aspect-video max-w-xl bg-zinc-500 text-center"></div>
      <h1 className="text-center">{course.name}</h1>
      <div className="flex flex-row flex-wrap items-center justify-center pb-8">
        <span className="mx-8 flex items-center">
          <span className="mr-4 inline-block aspect-square w-12 rounded-full bg-zinc-500"></span>
          <Link href={`/${company}/teachers/${course.teacherId}`}>
            <a>{getTeacher(parseInt(course.teacherId)).name}</a>
          </Link>
        </span>
        <span className="mx-8 py-4">
          Created at:{" "}
          {course.createdAt.toLocaleString("en-US", {
            timeZone: "Asia/Bangkok",
          })}
        </span>
      </div>
      <button className="mx-auto block w-full max-w-lg rounded-lg bg-green-700 p-2 px-4 font-bold text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-green-800">
        Pay 100 THB to enroll
      </button>
      <h2>Description:</h2>
      <ReactMarkdown>{course.detail || "(no description)"}</ReactMarkdown>
    </ProsePage>
  );
};

export default CoursePage;
