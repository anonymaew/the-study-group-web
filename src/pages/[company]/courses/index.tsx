import { useRouter } from 'next/router';

import ItemsPage from '../../../layouts/items';
import { trpc } from '../../../utils/trpc';

const CoursesPage = () => {
  const router = useRouter();
  const { company } = router.query;
  const { data: courses, isLoading } = trpc.course.read.all.useQuery();

  return (
    <ItemsPage
      loading={isLoading || courses === null || courses === undefined}
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
      layout={"cards"}
    ></ItemsPage>
  );
};

export default CoursesPage;
