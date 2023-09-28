import { LockSimple, WarningCircle } from "@phosphor-icons/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useResetPasswordMutation } from "@/api/passwords/commands/reset";
import { Button } from "@/app/components/Button/Button";
import { Input } from "@/app/components/Input/Input";
import { validationMessages } from "@/utils/validationMessages";

import styles from "./resetPassword.module.css";

export default function ResetPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordCommand>();

  const resetPassword = useResetPasswordMutation();
  const { isError, error, isLoading } = resetPassword;

  const handleSResetPassword = async (data: ResetPasswordCommand) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get("token");

    const mutationPromise = resetPassword.mutateAsync({
      token: token || "",
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
    toast.promise(mutationPromise, {
      pending: "Processando...",
      success: "Sua senha foi alterada com sucesso!",
      error: "Ocorreu um erro. Verifique se as senhas estão iguais",
    });

    await mutationPromise;
    router.push("/login");
  };
  return (
    <>
      <Head>
        <title>Resetar senha</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.login}>
          <div className={styles.animation}>
            <Image
              className={styles.logoImg}
              src={"/logo.png"}
              alt="Logo"
              height={134}
              width={230.03}
            />
            <h1 className={styles.title}>Resetar senha</h1>
            <form
              className={styles.form}
              onSubmit={handleSubmit(handleSResetPassword)}
            >
              <Input
                type="password"
                error={!!errors.password}
                errorMessage={errors.password?.message}
                leftIcon={<LockSimple size={22} />}
                placeholder="Nova senha"
                {...register("password", validationMessages.password)}
                aria-invalid={errors.password ? "true" : "false"}
                rightIcon={<WarningCircle size={22} />}
              />
              <div className={styles.buttons}>
                <Input
                  type="password"
                  error={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword?.message}
                  leftIcon={<LockSimple size={22} />}
                  placeholder="Confirmação da senha"
                  {...register(
                    "confirmPassword",
                    validationMessages.confirmPassword,
                  )}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                  rightIcon={<WarningCircle size={22} />}
                />
                <Button disabled={isLoading} placeholder="Alterar senha" />
              </div>
            </form>
          </div>
        </div>
        <div className={styles.background}></div>
      </div>
    </>
  );
}
