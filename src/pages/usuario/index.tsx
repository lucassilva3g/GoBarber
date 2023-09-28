import { ReactNode } from "react";

import { GetServerSidePropsContext } from "next";

import { UserFilter } from "@/app/components/User/UserFilter";
import { UsersTable } from "@/app/components/User/UsersTable";
import { DashBoardLayout } from "@/app/layouts/DashboardLayout";
import { UserProvider } from "@/app/providers/UserProvider";
import { UsersProvider } from "@/app/providers/UsersProvider";
import { validateToken } from "@/utils/authUtils";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return validateToken(context);
}

function Usuario() {
  return (
    <UsersProvider>
      <UserFilter />
      <br />
      <UsersTable />
    </UsersProvider>
  );
}

Usuario.getLayout = function getLayout(page: ReactNode) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default Usuario;
