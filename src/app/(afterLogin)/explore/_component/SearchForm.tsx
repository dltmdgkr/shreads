"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function SearchForm({ q }: { q: string }) {
  const router = useRouter();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?q=${event.currentTarget.search.value}`);
  };

  return (
    <form className="fixed top-0 w-full" onSubmit={onSubmit}>
      <div className="flex items-center w-full max-w-xl bg-gray-200 rounded-full mt-6 mb-12">
        <svg
          className="w-6 h-6 ml-4 text-gray-600"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"
            fill="#333"
          />
        </svg>
        <input
          name="search"
          type="search"
          className="w-full py-2 px-4 text-gray-700 rounded-full bg-transparent focus:outline-none"
          placeholder="검색"
        />
      </div>
    </form>
  );
}
