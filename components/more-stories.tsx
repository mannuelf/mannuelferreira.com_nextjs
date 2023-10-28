import PostPreview from "./post-preview";

type Props = {
  posts: Post[];
};

const MoreStories = ({ posts }: Props) => {
  return (
    <section>
      <div data-test-posts className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-32">
        {posts.map((post) => (
          <PostPreview key={post.slug} {...post} />
        ))}
      </div>
    </section>
  );
};

export default MoreStories;
