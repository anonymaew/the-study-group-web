import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

import ProsePage from '../../../layouts/prose';
import { trpc } from '../../../utils/trpc';

const TeacherPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: teacher, isLoading } = trpc.user.read.one.useQuery({
    id: userId as string,
  });

  return (
    <ProsePage loading={isLoading || teacher === undefined || teacher === null}>
      <div className="mx-auto my-8 aspect-square w-48 rounded-full bg-zinc-500"></div>
      <h1 className="text-center">{teacher?.name}</h1>
      <h2>Description</h2>
      <ReactMarkdown>{teacher?.details || "empty"}</ReactMarkdown>
    </ProsePage>
  );
};

export default TeacherPage;
