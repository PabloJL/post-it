"use client";
import Image from "next/image";
import AddPost from "./components/AddPost";

export default function Home() {
  return (
    <main>
      <h1>Hello Next</h1>
      <AddPost />
    </main>
  );
}
