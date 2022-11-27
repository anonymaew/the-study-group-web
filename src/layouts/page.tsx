import Navbar from '../components/navbar';

const Page = (props: {
  children: React.ReactNode;
  loading?: boolean;
}): JSX.Element => {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-900">
      <div
        className={`container mx-auto min-h-screen p-4 pt-16 ${
          props.loading && "blur"
        }`}
      >
        <Navbar />
        {props.children}
      </div>
    </div>
  );
};

export default Page;
