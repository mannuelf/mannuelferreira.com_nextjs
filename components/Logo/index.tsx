import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link passHref href='/'>
      <a className='logo-icon'>
        <Image
          src='/assets/icons/mf-logo.svg'
          alt='Mannuel Ferreira'
          unoptimized={true}
          width={96}
          height={64}
        />
      </a>
    </Link>
  );
};

export default Logo;
