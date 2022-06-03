import React, { PropsWithChildren } from 'react';
import Container from './container';
import cn from 'classnames';
import { GITHUB_URL } from '@shared/constants';

type Props = {
  preview?: boolean;
};

const Alert: React.FC<Props> = (preview) => {
  return (
    <div
      className={cn('border-b', {
        'bg-accent-7 border-accent-7 text-white': preview,
        'bg-accent-1 border-accent-2': !preview,
      })}
    >
      <Container>
        <div className='py-2 text-center text-sm'>
          The source code for this blog is{' '}
          <a
            href={`${GITHUB_URL}`}
            className='underline hover:text-success duration-200 transition-colors'
          >
            available on GitHub
          </a>
          .
        </div>
      </Container>
    </div>
  );
};

export default Alert;
