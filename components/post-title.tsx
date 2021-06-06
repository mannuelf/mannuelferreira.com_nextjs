import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-normal leading-tight md:leading-none mb-2 text-left">
      {children}
    </h1>
  );
};

export default PostTitle;
