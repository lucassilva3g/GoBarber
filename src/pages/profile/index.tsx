import { Avatar } from "@mui/material";
import {
  ArrowLeft,
  EnvelopeSimple,
  LockSimple,
  User,
} from "@phosphor-icons/react";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useUpdateProfileMutation } from "@/api/profiles/commands/useUpdateProfileMutation";
import { Button } from "@/app/components/Button/Button";
import { Input } from "@/app/components/Input/Input";
import useAuth from "@/app/hooks/useAuth";
import styles from "@/pages/profile/profile.module.css";
import { validateToken } from "@/utils/authUtils";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return validateToken(context);
}

export default function Profile() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileCommand>({
    defaultValues: {
      name: user?.unique_name || "",
    },
  });

  const updateProfile = useUpdateProfileMutation();
  const { isError, error, isLoading } = updateProfile;

  const handleProfile = async (data: UpdateProfileCommand) => {
    const mutationPromise = updateProfile.mutateAsync(data);

    toast.promise(mutationPromise, {
      pending: "Processando...",
      success: "Seus dados foram atualizados com sucesso!",
      error:
        "Ocorreu um erro ao atualizar seus dados. Por favor, tente novamente",
    });

    const response = await mutationPromise;
    console.log(data);
  };
  return (
    <>
      <Head>
        <title>Perfil</title>
      </Head>
      <div className={styles.container}>
        <Link href="/usuario">
          <ArrowLeft className={styles.arrowLeft} size={22} />
        </Link>
        <Avatar src="" sx={{ width: 100, height: 100 }}>
          {user?.unique_name[0]}
        </Avatar>
        <form onSubmit={handleSubmit(handleProfile)}>
          <div className={styles.content}>
            <div className={styles.info}>
              <div className={styles.user}>
                <h2>Meu perfil</h2>
                <Input
                  type="name"
                  leftIcon={<User size={22} />}
                  placeholder="Nome"
                  {...register("name")}
                />
                <Input
                  type="email"
                  leftIcon={<EnvelopeSimple size={22} />}
                  placeholder={user?.email}
                  disabled={true}
                />
              </div>
              <div className={styles.passwords}>
                <Input
                  type="password"
                  error={!!errors.password}
                  errorMessage={errors.password?.message}
                  leftIcon={<LockSimple size={22} />}
                  placeholder="Senha atual"
                  {...register("password")}
                />
                <Input
                  type="password"
                  error={!!errors.newPassword}
                  errorMessage={errors.newPassword?.message}
                  leftIcon={<LockSimple size={22} />}
                  placeholder="Nova senha"
                  {...register("newPassword")}
                />
                <Input
                  type="password"
                  error={!!errors.confirmNewPassword}
                  errorMessage={errors.confirmNewPassword?.message}
                  leftIcon={<LockSimple size={22} />}
                  placeholder="Confirme nova senha"
                  {...register("confirmNewPassword")}
                />
                <Button type="submit" placeholder="Confirmar"></Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
