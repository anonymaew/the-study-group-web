import Navbar from '../components/navbar';
import { useCompanyInterface } from '../lib/useCompany';

const Window = (props: {
  head: useCompanyInterface;
  contentLoading: boolean;
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-900">
      <Navbar head={props.head} />
      <div
        className={`mx-auto min-h-screen max-w-7xl p-4 pt-8 ${
          props.contentLoading ? "animate-pulse blur" : ""
        }`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Window;
