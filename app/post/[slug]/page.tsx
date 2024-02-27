"use client";
import Post from "@/app/components/Post";
import { PostsType } from "@/app/types/Posts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddComment from "@/app/components/AddComment";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

function PostDetail(url: URL) {
  const { data, isLoading } = useQuery({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return "Loading ...";
  console.log(data);
  return (
    <div>
      <Post
        id={data?.id}
        name={data?.user.name}
        image={data?.user.image}
        postTitle={data?.title}
        comments={data?.Comment}
      />
      <AddComment id={data?.id} />
    </div>
  );
}

export default PostDetail;
