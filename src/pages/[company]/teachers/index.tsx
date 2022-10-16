import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Teacher } from '@prisma/client';

import { getTeachers } from '../../../constant/teachers';
import ListsPage from '../../../layouts/lists';
import ProsePage from '../../../layouts/prose';
import { trpc } from '../../../utils/trpc';

const TeachersPage = () => {
  const router = useRouter();
  const { company } = router.query as { company: string };
  // const { data: teachersData, isLoading } = trpc.teacher.read.all.useQuery();
  const [teachers, setTeachers] = useState<Teacher[]>(getTeachers());

  //   useEffect(() => {
  //     if (teachersData !== undefined && teachersData !== null)
  //       setTeachers(teachersData);
  //   }, [teachersData]);

  return (
    <ListsPage
      loading={
        // isLoading ||
        teachers === null || teachers === undefined
      }
      data={{
        heading: "Teachers",
        items: teachers.map((teacher) => ({
          id: teacher.id.toString(),
          name: teacher.name,
          link: `/${company}/teachers/${teacher.id}`,
        })),
      }}
    ></ListsPage>
  );
};

export default TeachersPage;
