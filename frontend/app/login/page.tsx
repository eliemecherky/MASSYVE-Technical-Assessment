import React from "react";
import LoginForm from "./LoginForm";
import FormWrap from "@/components/FormWrap";

const LoginPage = () => {
  return (
    <>
      <div className="container">
        <FormWrap>
          <LoginForm />
        </FormWrap>
      </div>
    </>
  );
};

export default LoginPage;
