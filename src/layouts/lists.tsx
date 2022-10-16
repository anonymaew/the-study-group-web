import Link from 'next/link';

import ProsePage from './prose';

export interface ListsPageProps {
  heading: string;
  items: {
    id: string;
    name: string;
    link: string;
  }[];
}

const ListsPage = (props: { data: ListsPageProps; loading?: boolean }) => {
  return (
    <ProsePage loading={props.loading}>
      <h1 className="">{props.data.heading}</h1>
      <ul>
        {props.data.items.map((item) => (
          <li key={item.id}>
            <Link href={item.link}>
              <a>{item.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </ProsePage>
  );
};

export default ListsPage;
