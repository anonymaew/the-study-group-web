import { useCompanyInterface } from '../lib/useCompany';
import Window from './window';

const ProsePage = (props: {
  head: useCompanyInterface;
  contentLoading: boolean;
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Window head={props.head} contentLoading={props.contentLoading}>
      <div className="prose prose-sm prose-zinc h-full max-w-none dark:prose-invert">
        {props.children}
      </div>
    </Window>
  );
};

export default ProsePage;
