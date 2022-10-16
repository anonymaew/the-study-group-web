import { useRouter } from 'next/router';

import ProsePage from '../../layouts/prose';

const CompanyMainPage = () => {
  const router = useRouter();
  const { company } = router.query;
  return (
    <ProsePage>
      <h1 className=" text-center text-5xl font-black">
        {company} home page something
      </h1>
    </ProsePage>
  );
};

export default CompanyMainPage;
