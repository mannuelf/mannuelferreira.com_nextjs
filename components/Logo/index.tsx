import Image from 'next/image';
import Link from 'next/link';

const logoSvg =
  'https://res.cloudinary.com/mannuel/image/upload/v1623925494/images/mf-logo.svg';

const Logo = () => {
  return (
    <Link passHref href='/'>
      <a className='logo-icon'>
        <Image src={logoSvg} alt='Mannuel Ferreira' width={96} height='auto' />
      </a>
    </Link>
  );
};

export default Logo;
