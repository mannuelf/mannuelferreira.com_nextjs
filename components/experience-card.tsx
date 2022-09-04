import Image from 'next/image';
import { ExperienceCardProps } from './experience-card.types';

const ExperienceCard = ({ title, date, logo }: ExperienceCardProps) => {
  return (
    <>
      <div className='p-4 bg-white rounded-md'>
        <h2 className='pb-1 text-xl font-light'>{title}</h2>
        <h3 className='pb-4 text-2xl font-light'>{date}</h3>
        <Image
          width={logo.width}
          height={logo.height}
          objectFit='cover'
          src={logo.href}
          alt={logo.title}
        />
      </div>
    </>
  );
};

export default ExperienceCard;
