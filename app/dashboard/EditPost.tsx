"use client";
import Image from "next/image";
import { useState } from "react";
import Toggle from "./Toggle";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

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
  const [toggle, setToggle] = useState(false);
  let toastPostID = "hello";
  const queryClient = useQueryClient();
  //Delete post
  const mutationFunction = async () => {
    const response = await axios
      .delete("/api/posts/deletePost", { data: id })
      .then((data) => {
        // Success handler
        toast.success("Post has been deleted!", { id: toastPostID });
        queryClient.invalidateQueries(["auth-posts"]);
      })
      .catch((error) => {
        // Error handler
        toast.error("Error deleting the post", { id: toastPostID });
      });
  };

  const { mutate } = useMutation({ mutationFn: mutationFunction });

  const deletePost = () => {
    toastPostID = toast.loading("Deleting your post ...", { id: toastPostID });
    mutate();
  };

  return (
    <>
      <div className="  bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image
            width={32}
            height={32}
            src={image}
            alt="profile picture"
            className="rounded-full"
            priority
          />
          <h3 className="font-bold text-gray-700">{name}</h3>
          <div className="ml-auto flex gap-2">
            <button className="text-sm font-bold text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>
            <button
              onClick={() => setToggle(true)}
              className="text-sm font-bold text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className=" my-8">
          <p className=" break-all">{title}</p>
        </div>
        <div className=" flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          <p className=" text-sm font-bold text-gray-700">
            {comments?.length}{" "}
          </p>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}

export default EditPost;
