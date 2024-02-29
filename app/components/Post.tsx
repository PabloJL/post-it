"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

function Post({ image, name, postTitle, id, comments, likes, userId }) {
  const [like, setLike] = useState(false);
  const queryClient = useQueryClient();
  //   Create a post
  const mutationFunction = async () => {
    const response = await axios
      .post("/api/posts/addLike", { id })
      .then((response) => {
        // Success handler
        queryClient.invalidateQueries(["posts"]);
        return response;
      })
      .catch((error) => {
        // Error handler

        setLike(false);
      });
  };

  const { mutate } = useMutation({ mutationFn: mutationFunction });

  const sendLike = async () => {
    setLike(!like);
    mutate();
  };

  useEffect(() => {
    // Check if the current user has liked the post
    likes.map((like) => {
      if (like.userId === userId && like.postId === id) {
        setLike(true);
      }
    });
  }, [id, userId]);

  return (
    <div className=" bg-white my-8 p-8 rounded-lg">
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
        <p className="break-all">{postTitle}</p>
      </div>

      <div className=" flex gap-1 cursor-pointer items-center">
        <button onClick={sendLike}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={like ? "red" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke={like ? "red" : "currentColor"}
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
        <p
          className=" text-sm font-bold
          text-gray-700"
        >
          {likes?.length} Likes
        </p>
        <Link href={`/post/${id}`}>
          <div className="flex gap-1 ml-2">
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
            <p
              className=" text-sm font-bold
          text-gray-700"
            >
              {comments?.length} Comments
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Post;
