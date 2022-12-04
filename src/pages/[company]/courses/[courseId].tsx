import { useRouter } from 'next/router';

import Blog from '../../../components/blog';
import ProsePage from '../../../layouts/prose';
import { trpc } from '../../../utils/trpc';

const CoursePage = () => {
  const router = useRouter();
  const { company, courseId } = router.query;
  const { data: course, isLoading } = trpc.course.read.one.useQuery({
    id: courseId as string,
  });

  return (
    <ProsePage loading={isLoading || course === undefined || course === null}>
      <div className="mx-auto my-8 aspect-video max-w-xl bg-zinc-500 text-center"></div>
      {course && (
        <Blog
          data={course.page}
          authors={course.teacherEnrollment.map(
            (enrollment) => enrollment.user
          )}
          writable={false}
        />
      )}
    </ProsePage>
  );
};

export default CoursePage;
