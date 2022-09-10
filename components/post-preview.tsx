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
    <article className='p-5 m-0 bg-white border-2 border-white hover:border-l-purple rounded-md transition-all'>
      <Link as={`/posts/${slug}`} href='/posts/[slug]'>
        <a className='hover:text-purple'>
          <span className='mb-3 text-3xl font-medium leading-snug'>{title}</span>
          <span className='block mb-4 text-lg text-gray-600'>
            <DateFormatter dateString={date} />
          </span>
          <p className='mb-1 text-lg leading-relaxed'>{excerpt}</p>
        </a>
      </Link>
    </article>
  );
};

export default PostPreview;
