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
      <div className=" flex items-center gap-2">
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
      <div className=" my-8">
        <p className=" break-all">{title}</p>
      </div>
      <div className=" flex items-center gap-4">
        <p className=" text-sm font-bold text-gray-700">
          {comments?.length} Comments
        </p>
        <button className=" text-sm font-bold text-red-500">Delete</button>
      </div>
    </div>
  );
}

export default EditPost;
