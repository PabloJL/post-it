export type PostsType = {
  title: string;
  id: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
  hearts: {
    id: string;
    postId: string;
    userId: string;
  }[];
  Comment?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
};
