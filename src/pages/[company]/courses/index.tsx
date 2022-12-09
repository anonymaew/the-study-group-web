import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import ItemsPage from '../../../layouts/items';
import { trpc } from '../../../utils/trpc';

const CoursesPage = () => {
  const router = useRouter();
  const { data } = useSession();
  const { company, search } = router.query as {
    company: string;
    search?: string;
  };
  const { data: courses, isLoading: courseLoading } =
    trpc.course.read.all.useQuery({
      search: search || "",
    });
  const courseCreate = trpc.course.create.useMutation();
  const { data: user, isLoading: userLoading } = trpc.user.read.one.useQuery({
    id: data?.user?.id || " ",
  });

  return (
    <ItemsPage
      loading={courseLoading || courses === null || courses === undefined}
      heading={"Courses"}
      items={
        courses?.map((course) => ({
          ...course.page,
          link: `/${company}/courses/${course.id.slice(-6)}`,
          authors: course.teacherEnrollment.map(
            (enrollment) => enrollment.user
          ),
          price: 100,
        })) || []
      }
      functions={{
        search: (search) => {
          router.push({
            pathname: `/${company}/courses`,
            query: { search },
          });
        },
      }}
      layout={"cards"}
      write={
        !userLoading && user && user.role !== "STUDENT"
          ? {
              create: (name) =>
                courseCreate.mutate({ name, companyId: company }),
            }
          : undefined
      }
    ></ItemsPage>
  );
};

export default CoursesPage;
