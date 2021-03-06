import PostPreview from './post-preview';

type Props = {
  posts: Post[];
};

const MoreStories = ({ posts }: Props) => {
  return (
    <section>
      <h2 className='mb-8 text-4xl md:text-4xl font-bold tracking-tighter leading-tight'>
        Articles
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-32'>
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
};

export default MoreStories;
