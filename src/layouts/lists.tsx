import Link from 'next/link';

import ProsePage from './prose';

export interface ListsPageProps {
  heading: string;
  items: React.ReactNode[];
}

const ListsPage = (props: { data: ListsPageProps; loading?: boolean }) => {
  return (
    <ProsePage loading={props.loading}>
      <h1 className="">{props.data.heading}</h1>
      <ul>
        {props.data.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </ProsePage>
  );
};

export default ListsPage;
