import { useSession } from 'next-auth/react';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { MainCompany, User } from '@prisma/client';

import { trpc } from '../utils/trpc';

export interface useCompanyInterface {
  router?: NextRouter;
  company?: MainCompany | null;
  user?: User | null;
}

const useCompany = () => {
  const router = useRouter();
  const { company } = router.query;
  const { data: session, status } = useSession();
  const { data: companyData, isLoading: companyLoading } =
    trpc.company.read.one.useQuery(
      {
        id: company as string,
      },
      {
        enabled: router.isReady && company !== undefined,
      }
    );
  const { data: userData, isLoading: userLoading } =
    trpc.user.read.one.useQuery(
      {
        id: session?.user?.id || " ",
      },
      {
        enabled: status === "authenticated" && session?.user?.id !== undefined,
      }
    );
  const [data, setData] = useState<useCompanyInterface>({});

  useEffect(() => {
    if (!companyLoading && data.company === undefined) {
      setData((oldData) => {
        return { ...oldData, company: companyData || null };
      });
      // console.log("company", companyData || null);
    }
    if (status !== "loading" && data.user === undefined) {
      if (status === "authenticated" && userLoading) return;
      setData((oldData) => {
        return {
          ...oldData,
          user: status === "authenticated" ? userData || null : null,
        };
      });
      // console.log("user", status === "authenticated" ? userData || null : null);
    }
    if (router.isReady && data.router === undefined) {
      setData((oldData) => {
        return { ...oldData, router };
      });
      // console.log("router", router);
    }
  }, [
    router,
    companyData,
    companyLoading,
    userData,
    userLoading,
    status,
    data,
  ]);

  return data;
};

export default useCompany;
