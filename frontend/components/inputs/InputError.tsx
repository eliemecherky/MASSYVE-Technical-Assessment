import React from "react";
import { FieldError } from "react-hook-form";

const InputError = ({ error }: { error: FieldError | undefined }) => {
  return (
    error && (
      <div className="w-full">
        <span className="text-red-500 my-3">{error.message}</span>
      </div>
    )
  );
};

export default InputError;
