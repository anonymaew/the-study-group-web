import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Course } from '@prisma/client';

import { getCourses } from '../../../constant/courses';
import { getTeacher } from '../../../constant/teachers';
import CardsPage from '../../../layouts/cards';

const CoursesPage = () => {
  const router = useRouter();
  const { company } = router.query;
  const [courses, setCourses] = useState<Course[]>(getCourses());

  return (
    <CardsPage
      loading={courses === null || courses === undefined}
      data={{
        heading: "Courses",
        items: courses.map((course) => ({
          id: course.id.toString(),
          name: course.name,
          link: `/${company}/courses/${course.id}`,
          imgLink: null,
          description: course.detail,
          price: 100,
          children: (
            <>
              <div className="flex w-full items-center">
                <span className="inline-block aspect-square w-12 rounded-full bg-zinc-500"></span>
                <span className="px-4">
                  <Link href={`/${company}/teachers/${course.teacherId}`}>
                    <a className="text-zinc-700 dark:text-zinc-300">
                      {getTeacher(parseInt(course.teacherId)).name}
                    </a>
                  </Link>
                </span>
              </div>
              <p className="text-sm text-zinc-500">{`Created at: ${course.createdAt.toLocaleString(
                "en-US",
                {
                  timeZone: "Asia/Bangkok",
                }
              )}`}</p>
            </>
          ),
        })),
      }}
    ></CardsPage>
  );
};

export default CoursesPage;
