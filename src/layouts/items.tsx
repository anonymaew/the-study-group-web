import { Field, Form, Formik, useFormik, useFormikContext } from 'formik';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { MagnifyingGlassIcon, QueueListIcon, Squares2X2Icon } from '@heroicons/react/20/solid';
import { Page, User } from '@prisma/client';
import { UseMutateFunction } from '@tanstack/react-query';
import { UseTRPCMutationResult } from '@trpc/react/shared';

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
  layout: "cards" | "lists";
  functions?: {
    search?: (search: string) => void;
    sort?: (sort: string) => void;
    filter?: (filter: string) => void;
  };
  write?: {
    create?: (name: string) => void;
  };
}

enum sortOptions {
  "new" = "Newest",
  "old" = "Oldest",
  "az" = "A-Z",
  "za" = "Z-A",
}

const ItemsPage = (props: ItemsPageProps) => {
  const [layout, setLayout] = useState<"cards" | "lists">(props.layout);

  // useEffect(() => {
  // console.log("values", values.sort);
  // setItems((oldItems) => {
  //   switch (sort) {
  //     case sortOptions.az:
  //       return oldItems.sort((a, b) => a.name.localeCompare(b.name));
  //     case sortOptions.za:
  //       return oldItems.sort((a, b) => b.name.localeCompare(a.name));
  //     case sortOptions.new:
  //       return oldItems.sort(
  //         (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  //       );
  //     case sortOptions.old:
  //       return oldItems.sort(
  //         (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
  //       );
  //   }
  // });
  // }, [values]);

  return (
    <ProsePage loading={props.loading}>
      <h1 className="">{props.heading}</h1>
      <div className="my-4 flex items-center justify-between border-b border-zinc-500 pb-4">
        <div>
          <Formik
            initialValues={{ search: "" }}
            onSubmit={(values) => {
              props.functions?.search?.(values.search);
            }}
          >
            <Form className="inline">
              <div className="mr-4 inline-block h-fit rounded-md bg-zinc-200 transition duration-200 ease-in-out focus-within:bg-zinc-300 dark:bg-zinc-700 dark:focus-within:bg-zinc-600">
                <Field
                  name="search"
                  placeholder="Search"
                  className="form-input w-28 border-none bg-transparent focus-visible:ring-0 sm:w-48"
                />
                <button type="submit">
                  <MagnifyingGlassIcon className="m-2 inline aspect-square w-5" />
                </button>
              </div>
            </Form>
          </Formik>
          <select
            name="sort"
            className="mr-4 rounded-md border-none bg-zinc-200 transition duration-200 ease-in-out hover:bg-zinc-300 focus-visible:ring-0 dark:bg-zinc-700 dark:hover:bg-zinc-600"
          >
            {Object.entries(sortOptions).map(([key, value]) => (
              <option value={value}>{value}</option>
            ))}
          </select>
        </div>
        <div>
          <button
            className="m-1 rounded-md bg-zinc-200 transition duration-200 ease-in-out hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
            onClick={() => {
              if (layout === "cards") setLayout("lists");
              else setLayout("cards");
            }}
          >
            {layout === "cards" && (
              <Squares2X2Icon className="m-2 aspect-square w-5" />
            )}
            {layout === "lists" && (
              <QueueListIcon className="m-2 aspect-square w-5" />
            )}
          </button>
        </div>
      </div>

      {layout === "cards" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {props.items.map((item, index) => (
            <div
              className="flex h-full w-full flex-col justify-between rounded-lg bg-zinc-200 transition duration-200 ease-in-out hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              key={index}
            >
              <Link href={item.link}>
                <a className="no-underline">
                  <div className="relative aspect-video w-full rounded-t-lg bg-zinc-500">
                    <span className="absolute bottom-2 right-2 rounded-md bg-zinc-700 px-2 font-bold text-green-500">
                      {item.price ? `${item.price} THB` : "Free"}
                    </span>
                  </div>
                  <h2 className="px-4 font-bold">{item.name}</h2>
                  <div className="px-4">
                    <Users data={item.authors} />
                    <p className="text-sm text-zinc-500">{`Created at: ${item.createdAt.toLocaleString(
                      "en-US",
                      {
                        timeZone: "Asia/Bangkok",
                      }
                    )}`}</p>
                  </div>
                </a>
              </Link>
            </div>
          ))}
          {props.write !== undefined && (
            <div className="h-full w-full rounded-lg bg-blue-200 p-4 text-blue-800 no-underline transition duration-200 ease-in-out dark:bg-blue-900 dark:text-blue-200">
              <p className="text-center text-lg font-bold">Create</p>
              <Formik
                initialValues={{ name: "" }}
                onSubmit={(values) => {
                  if (props.write && props.write.create)
                    props.write.create(values.name);
                }}
              >
                <Form>
                  <Field
                    name="name"
                    placeholder="Name"
                    className=" form-input mx-auto rounded-md border-blue-800 bg-transparent focus-visible:ring-0  dark:border-blue-300"
                  />
                  <button
                    type="submit"
                    className="ml-4 rounded-md  bg-blue-900 p-2 text-blue-200 transition duration-200 ease-in-out hover:bg-blue-800 dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300"
                  >
                    create
                  </button>
                </Form>
              </Formik>
            </div>
          )}
        </div>
      ) : (
        <>
          {props.items.map((item, index) => (
            <Link href={item.link} key={index}>
              <a
                className="m-4 mx-auto grid max-w-4xl grid-cols-2 items-center rounded-md bg-zinc-200 p-4 transition duration-200 ease-in-out hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                key={index}
              >
                <div>{item.name}</div>
                <div>
                  <Users data={item.authors} />
                </div>
              </a>
            </Link>
          ))}
          {props.write && props.write.create && (
            <a className="m-4 mx-auto grid max-w-4xl grid-cols-2 items-center rounded-md bg-blue-200 p-4 transition duration-200 ease-in-out dark:bg-blue-900">
              <Formik
                initialValues={{ name: "" }}
                onSubmit={(values) => {
                  if (props.write && props.write.create)
                    props.write.create(values.name);
                }}
              >
                <Form>
                  <Field
                    name="name"
                    placeholder="Name"
                    className=" form-input mx-auto rounded-md border-blue-800 bg-transparent focus-visible:ring-0  dark:border-blue-300"
                  />
                  <button
                    type="submit"
                    className="ml-4 rounded-md  bg-blue-900 p-2 text-blue-200 transition duration-200 ease-in-out hover:bg-blue-800 dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300"
                  >
                    create
                  </button>
                </Form>
              </Formik>
            </a>
          )}
        </>
      )}
    </ProsePage>
  );
};

export default ItemsPage;
