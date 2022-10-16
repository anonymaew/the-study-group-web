import Link from 'next/link';
import { ReactNode } from 'react';

import ProsePage from './prose';

interface CardsProps {
  heading: string;
  items: Card[];
}

interface Card {
  id: string;
  imgLink: string | null;
  name: string;
  link: string;
  children: ReactNode;
  price: number | null;
}

const Card = (props: { data: Card }) => {
  return (
    <div className=" flex h-full w-full flex-col justify-between rounded-lg bg-zinc-100 no-underline shadow-lg transition duration-200 ease-in-out hover:scale-105 dark:bg-zinc-800">
      <Link href={props.data.link}>
        <a>
          <div className="relative aspect-video w-full rounded-t-lg bg-zinc-500">
            <span className="absolute bottom-2 right-2 rounded-md bg-zinc-700 px-2 font-bold text-green-500">
              {props.data.price ? `${props.data.price} THB` : "Free"}
            </span>
          </div>
          <h2 className="px-4 font-bold underline">{props.data.name}</h2>
        </a>
      </Link>
      <div className="px-4">{props.data.children}</div>
    </div>
  );
};

const CardsPage = (props: { data: CardsProps; loading?: boolean }) => {
  return (
    <ProsePage loading={props.loading}>
      <h1 className="">{props.data.heading}</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {props.data.items.map((item) => (
          <Card key={item.id} data={item}></Card>
        ))}
      </div>
    </ProsePage>
  );
};

export default CardsPage;
