import ProsePage from '../../layouts/prose';
import useCompany from '../../lib/useCompany';

const CompanyMainPage = () => {
  const data = useCompany();
  return (
    <ProsePage head={data} contentLoading={false}>
      <h1 className=" text-center text-5xl font-black">
        {data.company?.name} home page something
      </h1>
    </ProsePage>
  );
};

export default CompanyMainPage;
