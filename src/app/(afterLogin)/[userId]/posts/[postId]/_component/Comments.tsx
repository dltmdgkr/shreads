"use client";

import { useQuery } from "@tanstack/react-query";
import Comment from "./Comment";
import { getComments } from "../_lib/getComments";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Comments({
  postId,
  post,
}: {
  postId: string;
  post: any;
}) {
  const supabase = createClientComponentClient();
  const { data } = useQuery({
    queryKey: ["posts", postId, "comments"],
    queryFn: () => getComments(supabase, postId),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (!data || !data.data) return null;

  const comments = data.data || [];

  return (
    <div className="h-[100dvh]">
      {comments.length > 0 ? (
        <div className="font-semibold p-4 border-b">답글</div>
      ) : null}
      <div className="pb-20">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} post={post} />
        ))}
      </div>
    </div>
  );
}
