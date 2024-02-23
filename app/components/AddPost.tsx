"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

function AddPost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  let toastPostID = "hello";

  //   Create a post
  const mutationFunction = async () => {
    const response = await axios
      .post("/api/posts/addPost", { title })
      .then((response) => {
        // Success handler
        onSuccess: toast.success("Post has been made!🔥", { id: toastPostID });
        setIsDisabled(false);
        setTitle("");
        return response;
      })
      .catch((error) => {
        // Error handler
        if (error instanceof AxiosError) {
          onError: toast.error(error?.response?.data.message, {
            id: toastPostID,
          });
        }
        setIsDisabled(false);
      });
  };

  const { mutate } = useMutation({ mutationFn: mutationFunction });

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostID = toast.loading("Creating your post", { id: toastPostID });
    setIsDisabled(true);
    mutate();
  };

  return (
    <form onSubmit={submitPost} className=" bg-white my-8 p-8 rounded-md">
      <div className=" flex flex-col my-4">
        <textarea
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind?"
          className=" p-4 text-lg rounded-md my-2 bg-gray-200 "
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={` font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          } `}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          type="submit"
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
        >
          Post
        </button>
      </div>
    </form>
  );
}

export default AddPost;
