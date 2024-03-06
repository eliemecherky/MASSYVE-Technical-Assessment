"use client";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegisterReturn<string>;
}
const Input: React.FC<InputProps> = ({ id, label, type, disabled, required, register }) => {
  return (
    <div className="w-full relative">
      <input
        autoComplete="off"
        required={required}
        id={id}
        disabled={disabled}
        {...register}
        type={type}
        className={`
          peer
          w-full
          p-4
          pt-6
          outline-none
          bg-white
          font-light
          border-2
          rounded-md
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
     
          
          `}
      />
      <label
        htmlFor={id}
        className={`absolute 
          cursor-text
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          left-4
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
       
          `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
