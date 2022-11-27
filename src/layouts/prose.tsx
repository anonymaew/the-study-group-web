import Page from './page';

const ProsePage = (props: {
  children: React.ReactNode;
  loading?: boolean;
}): JSX.Element => {
  return (
    <Page loading={props.loading}>
      <div className="prose prose-zinc h-full max-w-none dark:prose-invert">
        {props.children}
      </div>
    </Page>
  );
};

export default ProsePage;
