"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/model/Post";

export default function PostArticle({
  children,
  post,
}: {
  children: ReactNode;
  post: Post;
}) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/${post.profiles.user_name}/posts/${post.id}`);
  };

  return (
    <div
      className="lg:max-w-[60vw] border-b border-gray-200 md:pb-0 pb-2"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
