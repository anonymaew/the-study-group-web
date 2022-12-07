import Link from 'next/link';

import { Page, User } from '@prisma/client';

import Users from '../components/users';
import ProsePage from './prose';

interface ItemsPageProps {
  loading?: boolean;
  heading: string;
  items: Array<
    Page & {
      link: string;
      authors: User[];
      price?: number;
    }
  >;
  layout?: "cards" | "lists";
  writable?: boolean;
}

const ItemsPage = (props: ItemsPageProps) => (
  <ProsePage loading={props.loading}>
    <h1 className="">{props.heading}</h1>
    {props.layout !== undefined && props.layout === "cards" ? (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {props.items.map((item, index) => (
          <div
            className=" flex h-full w-full flex-col justify-between rounded-lg bg-zinc-100 no-underline shadow-lg transition duration-200 ease-in-out hover:scale-105 dark:bg-zinc-800"
            key={index}
          >
            <Link href={item.link}>
              <a>
                <div className="relative aspect-video w-full rounded-t-lg bg-zinc-500">
                  <span className="absolute bottom-2 right-2 rounded-md bg-zinc-700 px-2 font-bold text-green-500">
                    {item.price ? `${item.price} THB` : "Free"}
                  </span>
                </div>
                <h2 className="px-4 font-bold underline">{item.name}</h2>
              </a>
            </Link>
            <div className="px-4">
              <Users data={item.authors} />
              <p className="text-sm text-zinc-500">{`Created at: ${item.createdAt.toLocaleString(
                "en-US",
                {
                  timeZone: "Asia/Bangkok",
                }
              )}`}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <ul>
        {props.items.map((item, index) => (
          <li key={index}>
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    )}
  </ProsePage>
);

export default ItemsPage;
