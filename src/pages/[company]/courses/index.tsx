import Link from 'next/link';
import { useRouter } from 'next/router';

import CardsPage from '../../../layouts/cards';
import { trpc } from '../../../utils/trpc';

const CoursesPage = () => {
  const router = useRouter();
  const { company } = router.query;
  const { data: courses, isLoading } = trpc.course.read.all.useQuery();

  return (
    <CardsPage
      loading={courses === null || courses === undefined}
      data={{
        heading: "Courses",
        items:
          courses?.map((course) => ({
            id: course.id.toString(),
            name: course.page.name,
            link: `/${company}/courses/${course.id}`,
            imgLink: null,
            description: course.page.detail,
            price: 100,
            children: (
              <>
                <div className="flex w-full items-center">
                  <span className="inline-block aspect-square w-12 rounded-full bg-zinc-500"></span>
                  <span className="px-4">
                    <Link
                      href={`/${company}/users/${course.TeacherEnrollment[0]?.teacherId}`}
                    >
                      <a className="text-zinc-700 dark:text-zinc-300">
                        {course.TeacherEnrollment[0]?.teacher.name}
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
          })) || [],
      }}
    ></CardsPage>
  );
};

export default CoursesPage;
