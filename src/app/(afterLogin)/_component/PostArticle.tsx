"use client";

import { ReactNode } from "react";
import style from "./post.module.css";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
  post: {
    postId: number;
    User: {
      id: string;
      name: string;
      image: string;
    };
    content: string;
    createdAt: Date;
    Images: any[];
  };
}

export default function PostArticle({ children, post }: Props) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  };
  return (
    <article onClickCapture={onClick} className={style.post}>
      {children}
    </article>
  );
}