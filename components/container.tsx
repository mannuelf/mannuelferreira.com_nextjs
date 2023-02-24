import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const Container: React.FC<Props> = ({ children }: Props) => {
  return <section className='container mx-auto px-5'>{children}</section>;
};

export default Container;
