"use client";

import { useContext } from "react";
import { PostsToggleContext } from "./PostsToggleProvider";

export default function ToggleButton() {
  const { recommendPosts, setRecommendPosts } = useContext(PostsToggleContext);

  const onClick = () => {
    setRecommendPosts((prev) => !prev);
  };

  return (
    <button
      className="absolute flex bottom-10 left-10 border border-gray-500 py-4 px-5 rounded-full"
      onClick={onClick}
    >
      {recommendPosts === true ? "회원님을 위한 추천" : "팔로잉"}
      <svg
        aria-hidden="true"
        fill="none"
        height="20"
        viewBox="0 0 12 16"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-2"
      >
        <path
          d="M0.640625 11.0645C0.640625 10.8594 0.722656 10.6484 0.86914 10.5078L4.16211 7.25586C4.31445 7.10937 4.51367 7.02148 4.70703 7.02148C5.14062 7.02148 5.43359 7.33203 5.43359 7.74805C5.43359 7.97656 5.3457 8.14062 5.20508 8.27539L3.86914 9.57617L2.91406 10.373L4.25 10.3145L11.041 10.3145C11.498 10.3145 11.8145 10.6191 11.8145 11.0645C11.8145 11.5098 11.498 11.8145 11.041 11.8145L4.25 11.8145L2.91406 11.7559L3.86914 12.5527L5.20508 13.8535C5.3457 13.9883 5.43359 14.1523 5.43359 14.3809C5.43359 14.7969 5.14062 15.1074 4.70703 15.1074C4.51367 15.1074 4.31445 15.0195 4.16211 14.873L0.86914 11.6211C0.722656 11.4746 0.640625 11.2695 0.640625 11.0645ZM0.640625 4.92969C0.640625 4.48437 0.957031 4.17969 1.41406 4.17969L8.20508 4.17969L9.54102 4.23828L8.58594 3.44141L7.25 2.14648C7.10937 2.00586 7.02148 1.8418 7.02148 1.61328C7.02148 1.19727 7.31445 0.892578 7.74805 0.892578C7.94141 0.892578 8.14062 0.980469 8.29297 1.12695L11.5859 4.37305C11.7324 4.51953 11.8145 4.72461 11.8145 4.92969C11.8145 5.13477 11.7324 5.3457 11.5859 5.48633L8.29297 8.73828C8.14062 8.88477 7.94141 8.97266 7.74805 8.97266C7.31445 8.97266 7.02148 8.66797 7.02148 8.25195C7.02148 8.02344 7.10937 7.85937 7.25 7.72461L8.58594 6.41797L9.54102 5.62109L8.20508 5.68555L1.41406 5.68555C0.957031 5.68555 0.640625 5.375 0.640625 4.92969Z"
          fill="currentColor"
        ></path>
      </svg>
    </button>
  );
}