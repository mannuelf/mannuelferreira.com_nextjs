import Link from 'next/link';

type MusicCard = {
  imageUrl?: string;
  mbid?: string;
  nowplaying?: string;
  playCount?: string;
  playTitle: string;
  siteUrl: string;
  subTitle?: string;
  title: string;
};

const MusicCard = ({ imageUrl, mbid, nowplaying, playCount, playTitle, siteUrl, subTitle, title }: MusicCard) => {
  return (
    <div key={title} className='relative bg-purple-dark'>
      <div
        key={title + mbid}
        className={`${nowplaying ? 'nowplaying ' : ''}relative h-80 md:h-85 bg-purple-dark`}
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <div className='absolute bottom-0 left-0 pb-0'>
          {playCount ? (
            <h3 className='p-2 text-4xl font-normal text-white bg-black w-min bg-opacity-60'>
              {playCount}
              <span className='pl-2 text-xs font-light text-white'>plays</span>
            </h3>
          ) : null}{' '}
          {subTitle ? (
            <h2 className='pb-2 pl-2 text-xl font-light text-white bg-black bg-opacity-50'>
              <Link href={imageUrl ?? ''}>
                <a>{subTitle}</a>
              </Link>
            </h2>
          ) : null}
          <h2 className='pr-2 pb-2 pl-2 text-3xl font-light text-white bg-black bg-opacity-40'>
            <Link href={siteUrl ?? '#'}>
              <a>{title}</a>
            </Link>
          </h2>
          {nowplaying ? (
            <h3 className='p-2 text-3xl font-normal text-white bg-orange bg-opacity-60'>🎹 Now playing</h3>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
