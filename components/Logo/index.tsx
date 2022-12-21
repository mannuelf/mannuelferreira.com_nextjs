import Image from 'next/image';
import Link from 'next/link';

type Props = {
  customClass: string;
};

const Logo = ({ customClass }: Props) => {
  return (
    <Link passHref href='/' className={customClass}>
      <Image
        src='/assets/icons/mf-logo.svg'
        alt='Mannuel Ferreira'
        unoptimized={true}
        width={96}
        height={64}
      />
    </Link>
  );
};

export default Logo;
