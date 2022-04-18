import { PostCard, PostWidget, Categories } from "../components";
import { getPosts } from "../services";
export default function Home({ posts }) {
  return (
    <div>
      <div className="container mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            {posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Trazendo posts pela API no build do componente
export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return { props: { posts } };
}
