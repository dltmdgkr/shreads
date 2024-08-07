import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "./PostArticle";
import PostImages from "./PostImages";
import { Post } from "@/model/Post";
import { MouseEventHandler } from "react";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function Post({ post }: { post: Post }) {
  if (!post) return null;

  const stopPropagation: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <PostArticle post={post}>
      <section className="flex flex-col cursor-pointer sm:p-3 pt-4">
        <header className="flex">
          <section className="mr-3 w-10">
            <Link
              href={`/${post.profiles.id}`}
              onClick={stopPropagation}
              className="relative block w-10 h-10 rounded-full"
            >
              <img
                src={post.profiles.avatar_url!}
                alt="프로필 이미지"
                className="w-10 h-10 rounded-full border"
              />
              <p className="absolute top-0 left-0 w-10 h-10 rounded-full" />
            </Link>
          </section>
          <section className="flex flex-col w-full">
            <p className="flex items-center mb-2">
              <Link
                href={`/${post.profiles.id}`}
                onClick={stopPropagation}
                className="flex items-center"
              >
                <span className="font-bold hover:underline mr-1">
                  {post.profiles.user_name}
                </span>
                &nbsp;
              </Link>
              <span className="text-gray-500">
                {dayjs(post.created_at).fromNow(true)}
              </span>
            </p>
            <p>{post.content}</p>
            <section className="mt-3">
              <PostImages post={post} />
            </section>
            <ActionButtons post={post} />
          </section>
        </header>
      </section>
    </PostArticle>
  );
}
