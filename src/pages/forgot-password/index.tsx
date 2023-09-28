import { EnvelopeSimple, SignIn, WarningCircle } from "@phosphor-icons/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useForgetPasswordMutation } from "@/api/passwords/commands/forgot";
import { Button } from "@/app/components/Button/Button";
import { Input } from "@/app/components/Input/Input";

import styles from "./forgetPassword.module.css";
export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordCommand>();

  const forgetPassword = useForgetPasswordMutation();
  const { isError, error, isLoading } = forgetPassword;

  const handleRecoverPassword = async (data: ForgotPasswordCommand) => {
    const mutationPromise = forgetPassword.mutateAsync(data);

    toast.promise(mutationPromise, {
      pending: "Processando...",
      success:
        "Enviamos um link de acesso a seu email, confirme para continuar",
    });

    await mutationPromise;
  };
  return (
    <>
      <Head>
        <title>Recuperar senha</title>
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
            <h1 className={styles.title}>Recuperar senha</h1>
            <div className={styles.inputButtons}>
              <form
                className={styles.form}
                onSubmit={handleSubmit(handleRecoverPassword)}
              >
                <Input
                  error={!!errors.email}
                  errorMessage="Email obrigatório"
                  leftIcon={<EnvelopeSimple size={22} />}
                  placeholder="E-mail"
                  {...register("email", { required: true })}
                  aria-invalid={errors.email ? "true" : "false"}
                  rightIcon={<WarningCircle size={22} />}
                />
                <div className={styles.buttons}>
                  <Button disabled={isLoading} placeholder="Recuperar" />
                </div>
              </form>
            </div>
            <div className={styles.accountOptions}>
              <Link href="/login">
                <p className={styles.paragraph}>
                  <SignIn className={styles.iconSignIn} size={18} /> Voltar ao
                  login
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.background}></div>
      </div>
    </>
  );
}
