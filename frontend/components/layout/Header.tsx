"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data: session } = useSession();
  // console.log({ session });
  return (
    <>
      <div className="navbar shadow-lg">
        <div className="container">
          <div
            className={`navbar-container flex items-center ${
              session?.user ? "justify-between" : "justify-center md:justify-between"
            } border-1 border-b-black`}
          >
            {" "}
            <div className="logo">
              <Link href={"/"}>
                <Image
                  src={"assets/images/massyve-green.svg"}
                  alt="massyve-green"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </Link>
            </div>
            <div className="links hidden md:block">
              <ul className="flex items-center gap-4">
                {session?.user ? (
                  <>
                    <li>
                      <Link href={"/profile"}>Profile</Link>
                    </li>
                    <li>
                      <button onClick={() => signOut()}>Logout</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href={"/login"}>Login</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            {session?.user ? (
              <div className="links  md:hidden">
                <button onClick={() => signOut()}>Logout</button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
