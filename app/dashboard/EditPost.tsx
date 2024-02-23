"use client";
import Image from "next/image";
import { useState } from "react";

type EditProps = {
  id: string;
  image: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

function EditPost({ image, name, title, comments, id }: EditProps) {
  return (
    <div className="  bg-white my-8 p-8 rounded-lg">
      <div>
        <Image
          width={32}
          height={32}
          src={image}
          alt="profile picture"
          className="rounded-full"
          priority
        />
        <h3 className=" font-bold text-gray-700">{name}</h3>
      </div>
    </div>
  );
}

export default EditPost;
