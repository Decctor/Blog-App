import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../services";
import moment from "moment";
function PostWidget({ categories, slug }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((res) => {
        console.log(res.length);
        if (res.length == 0) {
          getRecentPosts().then((res) => setPosts(res));
        } else {
          setPosts(res);
        }
      });
    } else {
      getRecentPosts().then((res) => setPosts(res));
    }
  }, [slug]);
  return (
    <div className="bg-white rounded-lg py-4 px-5 mb-8">
      <h1 className="text-lg font-bold py-4 border-b border-gray-300">
        {slug ? "Posts relacionados" : "Posts recentes"}
      </h1>
      <div className="flex flex-col my-6">
        {posts.length > 0 &&
          posts.map((post) => (
            <div key={post.slug} className="flex items-center py-2">
              <div>
                <img
                  src={post.featuredImage.url}
                  alt="Tecnologias do futuro"
                  height="50px"
                  width="50px"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col ml-3 justify-center">
                <p className="text-gray-500 font-semibold">
                  {moment(post.createdAt).format("MMM DD, YYYY")}
                </p>
                <Link href="/post">
                  <h3 className="font-semibold text-sm cursor-pointer transition duration-600 hover:text-pink-600">
                    {post.title}
                  </h3>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PostWidget;
