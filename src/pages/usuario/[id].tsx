import { ReactNode } from "react";

import { Avatar } from "@mui/material";
import { ArrowLeft, EnvelopeSimple, User } from "@phosphor-icons/react";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { Input } from "@/app/components/Input/Input";
import useAuth from "@/app/hooks/useAuth";
import { useUser } from "@/app/hooks/useUser";
import { DashBoardLayout } from "@/app/layouts/DashboardLayout";
import styles from "@/pages/usuario/usuario.module.css";
import { validateToken } from "@/utils/authUtils";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return validateToken(context);
}

function UserDetails() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div>
      <Link href="/usuario">
        <ArrowLeft size={22} />
      </Link>
      <Avatar src="" sx={{ width: 100, height: 100 }}>
        {user?.name[0]}
      </Avatar>
      <div>
        <h1>Perfil de {user?.name}</h1>
        <p>{user?.id}</p>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <p>{user?.active}</p>
        <p>{user?.createdAt}</p>
        <p>{user?.updatedAt}</p>
      </div>
    </div>
  );
}

UserDetails.getLayout = function getLayout(page: ReactNode) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default UserDetails;
