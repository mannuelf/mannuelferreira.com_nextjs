import Link from 'next/link';

type MusicCard = {
  playCount: string;
  playTitle: string;
  subTitle: string;
  title: string;
  siteUrl: string;
  imageUrl: string;
};

const MusicCard = ({ title, playCount, subTitle, siteUrl, imageUrl }: MusicCard) => {
  return (
    <div key={title} className='relative bg-purple-dark'>
      <div
        key={title}
        className='relative h-96 bg-purple-dark'
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <div className='absolute bottom-0 left-0 pb-0'>
          <h2 className='pb-2 pl-2 text-xl font-light text-white'>
            <Link href={imageUrl ?? ''}>
              <a>{subTitle}</a>
            </Link>
          </h2>
          <h2 className='pb-2 pl-2 text-3xl font-light text-white'>
            <Link href={siteUrl ?? '#'}>
              <a>{title}</a>
            </Link>
          </h2>
          <h3 className='p-2 text-4xl font-normal text-white bg-black w-min bg-opacity-60'>
            {playCount ? playCount : null}
            <span className='pl-2 text-xs font-light text-white'>plays</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
