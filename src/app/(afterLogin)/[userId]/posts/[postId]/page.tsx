import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import SinglePost from "./_component/SinglePost";
import { getSinglePost } from "./_lib/getSinglePost";
import Comments from "./_component/Comments";
import { getComments } from "./_lib/getComments";
import CommentForm from "./_component/CommentForm";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import BackButton from "@/app/(afterLogin)/_component/BackButton";

interface PostDetailPageProps {
  params: { postId: string };
}

export async function generateMetadata({
  params: { postId },
}: PostDetailPageProps) {
  const post = await getSinglePost(postId);
  return {
    title: `@${post.profiles.user_name} • ${post.content}`,
  };
}

export default async function PostDetailPage({
  params: { postId },
}: PostDetailPageProps) {
  const supabase = await createServerSupabaseClient();
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  await queryClient.prefetchQuery({
    queryKey: ["posts", postId],
    queryFn: () => getSinglePost(postId),
  });

  const post = queryClient.getQueryData(["posts", postId]);

  await queryClient.prefetchQuery({
    queryKey: ["posts", postId, "comments"],
    queryFn: () => getComments(supabase, postId),
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="h-[100dvh] overflow-y-auto scrollbar-hide">
      <div className="ml-4 mt-2 mb-6 hidden sm:block">
        <BackButton />
      </div>
      <HydrationBoundary state={dehydratedState}>
        <SinglePost postId={postId} userId={user?.id} />
        <Comments postId={postId} post={post} />
        <CommentForm post={post} />
      </HydrationBoundary>
    </div>
  );
}
