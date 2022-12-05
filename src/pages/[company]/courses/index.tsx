import Link from 'next/link';
import { useRouter } from 'next/router';

import Users from '../../../components/users';
import CardsPage from '../../../layouts/cards';
import { trpc } from '../../../utils/trpc';

const CoursesPage = () => {
  const router = useRouter();
  const { company } = router.query;
  const { data: courses, isLoading } = trpc.course.read.all.useQuery();

  return (
    <CardsPage
      loading={isLoading || courses === null || courses === undefined}
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
                <Users
                  data={course.teacherEnrollment.map(
                    (enrollment) => enrollment.user
                  )}
                />
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
