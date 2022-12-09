import Navbar from '../components/navbar';

const Page = (props: {
  children: React.ReactNode;
  loading?: boolean;
}): JSX.Element => {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-900">
      <Navbar />
      <div
        className={`mx-auto min-h-screen max-w-7xl p-4 pt-8 ${
          props.loading ? "animate-pulse blur" : ""
        }`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Page;
