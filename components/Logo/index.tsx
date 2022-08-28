import Image from 'next/image';
import Link from 'next/link';

const Logo = ({customClass}) => {
  return (
    <Link passHref href='/'>
      <a className={customClass}>
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
