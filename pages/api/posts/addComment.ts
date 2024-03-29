import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client.js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Please sign-in" });

    // Get user
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    // Add a comment
    try {
      const { title, postId } = req.body.data;

      if (!title.length) {
        return res.status(401).json("Please add a comment");
      }

      const result = await prisma.comment.create({
        data: {
          message: title,
          userId: prismaUser?.id,
          postId,
        },
      });

      return res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: "Error has occured" });
    }
  }
}
