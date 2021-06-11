import DateFormatter from './date-formatter';
import Link from 'next/link';

type Props = {
  title: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const PostPreview = ({ title, date, excerpt, author, slug }: Props) => {
  return (
    <div>
      <h3 className='text-3xl mb-3 font-medium leading-snug'>
        <Link as={`/posts/${slug}`} href='/posts/[slug]'>
          <a className='hover:text-purple-900'>{title}</a>
        </Link>
      </h3>
      <div className='text-lg mb-4 text-gray-600'>
        <DateFormatter dateString={date} />
      </div>
      <p className='text-lg leading-relaxed mb-4'>{excerpt}</p>
    </div>
  );
};

export default PostPreview;
