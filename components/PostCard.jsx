import moment from "moment";
import React from "react";
import Link from "next/link";
function PostCard({ post }) {
  return (
    <div className="bg-white rounded-lg p-4 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top absolute h-80 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>

      <h1 className="cursor-pointer text-center text-3xl font-bold mb-6 transition duration-700 hover:text-pink-600">
        {post.title}
      </h1>
      <div className="flex justify-center mb-10">
        <div className="flex items-center mr-10">
          <img
            src={post.author.photo.url}
            alt="Autor"
            height="40px"
            width="40px"
            className="rounded-full"
          />
          <p className="ml-4">{post.author.name}</p>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p>{moment(post.createdAt).format("MMM DD,YYYY")}</p>
        </div>
      </div>
      <p className="text-center px-20 pb-5 text-gray-700 font-normal">
        {post.excerpt}
      </p>
      <div className="text-center my-5">
        <Link href={`post/${post.slug}`}>
          <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block px-10 py-3 bg-pink-600 text-white rounded-full cursor-pointer text-md font-medium">
            Continue lendo
          </span>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
