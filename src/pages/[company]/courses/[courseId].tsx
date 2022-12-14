import Page from '../../../layouts/page';
import useCourse from '../../../lib/useCourse';
import { trpc } from '../../../utils/trpc';

const CoursePage = () => {
  const data = useCourse();
  const { data: courseData, isLoading } = trpc.course.read.one.useQuery(
    { id: data.router?.query.courseId?.toString() || "-" },
    {
      enabled:
        data.router?.isReady &&
        data.router?.query.courseId?.toString() !== undefined,
    }
  );
  const courseUpdate = trpc.course.update.content.useMutation();

  return (
    <Page
      head={data}
      data={
        isLoading
          ? undefined
          : (courseData && {
              ...courseData.page,
              authors: courseData.teacherEnrollment.map(
                (enrollment) => enrollment.user
              ),
            }) ||
            null
      }
      write={{
        edit: (content) => {
          if (courseData)
            courseUpdate.mutate({
              courseId: data.course?.id || "-",
              page: {
                ...courseData.page,
                detail: content,
              },
            });
        },
      }}
    ></Page>
  );
};

export default CoursePage;
