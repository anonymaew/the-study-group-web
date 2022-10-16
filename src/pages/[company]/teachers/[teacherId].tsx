import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { Teacher } from '@prisma/client';

import { getTeacher } from '../../../constant/teachers';
import ProsePage from '../../../layouts/prose';
import { trpc } from '../../../utils/trpc';

const TeacherPage = () => {
  const router = useRouter();
  const { teacherId } = router.query;
  //   const { data: teacherData, isLoading } = trpc.teacher.read.one.useQuery({
  //     id: teacherId,
  //   });
  const [teacher, setTeacher] = useState<Teacher>(getTeacher(0));

  useEffect(() => {
    if (teacherId !== undefined && teacherId !== null)
      setTeacher(getTeacher(parseInt(teacherId as string)));
  }, [teacherId]);

  //   useEffect(() => {
  //     if (teacherData !== undefined && teacherData !== null)
  //       setTeacher(teacherData);
  //   }, [teacherData]);

  return (
    <ProsePage
      loading={
        // isLoading ||
        teacher === undefined || teacher === null
      }
    >
      <div className="mx-auto my-8 aspect-square w-48 rounded-full bg-zinc-500"></div>
      <h1 className="text-center">{teacher.name}</h1>
      <h2>Description</h2>
      <ReactMarkdown>{teacher?.description || "empty"}</ReactMarkdown>
    </ProsePage>
  );
};

export default TeacherPage;
