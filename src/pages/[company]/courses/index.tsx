import ItemsPage from '../../../layouts/items';
import useCompany from '../../../lib/useCompany';
import { trpc } from '../../../utils/trpc';

const CoursesPage = () => {
  const data = useCompany();
  const { data: courses, isLoading: coursesLoading } =
    trpc.course.read.all.useQuery(
      {
        search: data.router?.query.search?.toString() || "",
      },
      {
        enabled:
          data.router?.isReady && data.router?.query.search !== undefined,
      }
    );
  const courseCreate = trpc.course.create.useMutation();

  return (
    <ItemsPage
      head={data}
      heading={"Courses"}
      items={courses?.map((course) => ({
        ...course.page,
        link: `/${data.company?.id}/courses/${course.id.slice(-6)}`,
        authors: course.teacherEnrollment.map((enrollment) => enrollment.user),
        price: 100,
      }))}
      functions={{
        search: (search) => {
          data.router?.push({
            pathname: `/${data.company?.id}/courses`,
            query: { search },
          });
        },
      }}
      layout={"cards"}
      write={
        data.user && data.user.role !== "STUDENT"
          ? {
              create: (name) =>
                courseCreate.mutate({
                  name,
                  companyId: data.company?.id || "",
                }),
            }
          : undefined
      }
      contentLoading={coursesLoading}
    ></ItemsPage>
  );
};

export default CoursesPage;
