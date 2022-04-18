import React from "react";
import { useRouter } from "next/router";
import {
  PostWidget,
  Categories,
  PostDetail,
  Author,
  CommentForm,
  Comments,
} from "../../components";
import { getPostDetails, getPosts } from "../../services";
function PostDetails({ post }) {
  const router = useRouter();
  return (
    <div>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            <PostDetail post={post} />
            <div className="">
              <Author author={post.author} />
              <CommentForm slug={post.slug} />
              <Comments slug={post.slug} />
            </div>
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PostWidget
                slug={post.slug}
                categories={post.categories.map((category) => category.slug)}
              />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PostDetails;

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  return {
    props: { post: data },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
