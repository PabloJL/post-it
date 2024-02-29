"use client";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

type User = {
  image: string;
};

function Logged({ image }: User) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <li className=" flex gap-8 items-center">
      <div className=" relative">
        <div onClick={toggleMenu}>
          <Image
            width={50}
            height={50}
            src={image}
            alt="profile picture"
            className="rounded-full"
            priority
          />
        </div>
        {isMenuOpen && (
          <div className="menu absolute top-full right-2 mt-1 w-40 bg-white  p-8 rounded-lg shadow-sm text-end ">
            {/* Menu content goes here */}
            <ul>
              <li className=" font-normal border-b border-gray-700 pb-1">
                <Link href={"/dashboard"} onClick={toggleMenu}>
                  Profile
                </Link>
              </li>
              <li
                className=" cursor-pointer text-red-600 mt-2"
                onClick={() => signOut()}
              >
                Sign out
              </li>
            </ul>
          </div>
        )}
      </div>
    </li>
  );
}

export default Logged;
