"use client";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
import InputError from "@/components/inputs/InputError";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user) {
      router.push("/profile");
    }
  }, [session, router]);

  const loginSchema = z.object({
    username: z.string().min(1, { message: "Username is required!" }),
    password: z.string().min(8, { message: "Password must be at least 6 characters!" }),
  });

  type ILogin = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILogin>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      // console.log(callback);
      setIsLoading(false);
      if (callback?.ok) {
        router.push("/login");
        router.refresh();
        alert("logged in!");
      }
      if (callback?.error) {
        alert("Incorrect Credentials!");
        console.log("error>>>>", callback.error);
      }
    });

    reset();
  };

  const loginInputs = [
    {
      type: "username",
      id: "username",
      disabled: isLoading,
      register: { ...register("username") },
      error: errors.username,
      label: "username",
    },
    {
      type: "password",
      id: "password",
      disabled: isLoading,
      register: { ...register("password") },
      error: errors.password,
      label: "password",
    },
  ];

  return (
    <>
      <Heading title="Login Form" />

      {loginInputs.map((input) => (
        <div key={input.label} className="w-full">
          <Input
            id={input.id}
            label={input.label}
            type={input.type}
            register={input.register}
            disabled={input.disabled}
          />
          <InputError error={input.error} />
        </div>
      ))}

      <Button label={isLoading ? "Loading..." : "Login"} onClick={handleSubmit(onSubmit)} />
    </>
  );
};

export default LoginForm;
