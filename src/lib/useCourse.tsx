import { useEffect, useState } from 'react';

import { trpc } from '../utils/trpc';
import useCompany, { useCompanyInterface } from './useCompany';

export interface useCourseInterface extends useCompanyInterface {
  course?: {
    id: string;
    name: string;
    read: boolean;
    write: boolean;
  } | null;
}

const roles = {
  STUDENT: 1,
  TEACHER: 2,
  EMPLOYEE: 3,
  ADMIN: 4,
};

const useCourse = () => {
  const hooksData = useCompany();
  const { router, user: userData } = hooksData;
  const { data: courseData, isLoading: courseLoading } =
    trpc.course.read.head.useQuery(
      {
        id: router?.query.courseId as string,
      },
      {
        enabled:
          router?.isReady !== undefined && router?.query.courseId !== undefined,
      }
    );
  const [data, setData] = useState<useCourseInterface>(hooksData);

  useEffect(() => {
    if (!courseLoading && userData !== undefined)
      setData((oldData) => {
        return {
          ...hooksData,
          ...oldData,
          course: courseData
            ? {
                id: courseData.id,
                name: courseData.page.name,
                read:
                  courseData.studentEnrollment.length > 0 ||
                  courseData.teacherEnrollment.length > 0 ||
                  (userData !== null && roles[userData.role] > roles.TEACHER),
                write:
                  courseData.teacherEnrollment.length > 0 ||
                  (userData !== null && roles[userData.role] > roles.TEACHER),
              }
            : null,
        };
      });
  }, [courseData, courseLoading, hooksData, userData]);

  return data;
};

export default useCourse;
