"use client";
import FormWrap from "@/components/FormWrap";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const Profile = () => {
  const { data: session } = useSession();
  // console.log({ session });

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <>
      <FormWrap>
        <div className="mb-4">
          <p>
            <b>Name :</b> {session?.user?.username}
          </p>
        </div>
      </FormWrap>
    </>
  );
};

export default Profile;
