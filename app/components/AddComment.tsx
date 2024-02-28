"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type PostProps = {
  id?: string;
};

type Comment = {
  postId?: string;
  title: string;
};

function AddComment({ id }: PostProps) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostID = "hello";

  //   Create a post
  const mutationFunction = async (data: Comment) => {
    const response = await axios
      .post("/api/posts/addComment", { data })
      .then((response) => {
        // Success handler
        onSuccess: toast.success("Comment has been made!", { id: toastPostID });
        queryClient.invalidateQueries(["detail-post"]);
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

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostID = toast.loading("Adding your comment", { id: toastPostID });
    setIsDisabled(true);
    mutate({ title, postId: id });
  };

  return (
    <form onSubmit={submitComment} className=" my-8">
      {/* <h3>Add a comment</h3> */}
      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Write a comment ..."
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="flex items-center gap-2 justify-end">
        <p
          className={`font-semibold  ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          } `}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className=" text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add Comment 🚀
        </button>
      </div>
    </form>
  );
}

export default AddComment;
