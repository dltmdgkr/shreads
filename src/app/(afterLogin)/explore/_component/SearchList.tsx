import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { followUser } from "../_lib/followUser";
import { useFetchUser } from "../../_hook/useFetchUser";
import { isFollowingUser } from "../_lib/isFollowingUser";
import Image from "next/image";

interface FollowerData {
  follower_count: number;
}

export default function SearchList({
  user,
  followerData,
}: {
  user: any;
  followerData?: FollowerData;
}) {
  const { user: me } = useFetchUser();
  const queryClient = useQueryClient();

  const { data: isFollowing } = useQuery({
    queryKey: ["users", user.id, "followStatus"],
    queryFn: () => isFollowingUser(user.id, me.id),
    enabled: !!me?.id && !!user?.id,
  });

  const followMutationQuery = useMutation({
    mutationKey: ["users", user.id, "follow"],
    mutationFn: async (newIsFollowing: boolean) => {
      await followUser(user.id, me.id, newIsFollowing);
    },
    onMutate: async () => {
      const queryKey = ["users", user.id, "follows"];
      const previousData = queryClient.getQueryData<FollowerData>(queryKey);

      const newIsFollowing = !isFollowing;

      queryClient.setQueryData<FollowerData>(queryKey, (oldData) => ({
        ...oldData,
        follower_count:
          (oldData?.follower_count || 0) + (newIsFollowing ? 1 : -1),
      }));

      queryClient.setQueryData(
        ["users", user.id, "followStatus"],
        newIsFollowing
      );

      return { previousData, newIsFollowing };
    },
    onError: (err, variables, context) => {
      console.error("Error in mutation:", err);
      queryClient.setQueryData(
        ["users", user.id, "follows"],
        context?.previousData
      );
      queryClient.setQueryData(
        ["users", user.id, "followStatus"],
        context?.newIsFollowing
      );
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(
        ["users", user.id, "followStatus"],
        context?.newIsFollowing
      );
    },
  });

  const onClickFollow = () => {
    const newIsFollowing = !isFollowing;
    followMutationQuery.mutate(newIsFollowing);
  };

  return (
    <>
      <div className="flex items-center justify-between p-3">
        <Link href={`/${user.id}`}>
          <div className="flex items-center">
            <Image
              src={user.avatar_url}
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-4 border"
              width={40}
              height={40}
            />
            <div>
              <h2 className="text-md font-semibold hover:underline">
                {user.user_name}
              </h2>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
        </Link>
        <button
          onClick={onClickFollow}
          className={`border border-gray-300 text-sm py-1.5 px-8 rounded-xl ${
            isFollowing ? "text-gray-500" : "text-black"
          }`}
        >
          {isFollowing ? (
            "팔로잉"
          ) : (
            <span className="font-semibold">팔로우</span>
          )}
        </button>
      </div>
      <div className="ml-[70px] pb-3 border-b border-gray-200">
        <p>팔로워 {followerData?.follower_count || 0}명</p>
      </div>
    </>
  );
}
