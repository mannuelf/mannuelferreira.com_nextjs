import Avatar from './avatar';
import DateFormatter from './date-formatter';
import PostTitle from './post-title';
import Author from '../types/author';

type Props = {
  title: string;
  date: string;
  author: Author;
};

const PostHeader = ({ title, date, author }: Props) => {
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <PostTitle>{title}</PostTitle>
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
};

export default PostHeader;
