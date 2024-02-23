"use client";
import Image, { StaticImageData } from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

type User = {
  image: string;
};

function Logged({ image }: User) {
  return (
    <li className=" flex gap-8 items-center">
      <button
        onClick={() => signOut()}
        className=" bg-gray-700 text-white text-sm px-6 py-2 rounded-md"
      >
        Sign Out
      </button>
      <Link href={"/"}>
        <Image
          width={50}
          height={50}
          src={image}
          alt="profile picture"
          className="rounded-full"
          priority
        />
      </Link>
    </li>
  );
}

export default Logged;
