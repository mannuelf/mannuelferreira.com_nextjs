import Link from 'next/link';

type ScrobblesCard = {
  imageUrl?: string;
  mbid?: string;
  nowplaying?: string;
  playCount?: string;
  playTitle: string;
  siteUrl: string;
  subTitle?: string;
  title: string;
};

const ScrobblesCard = ({
  imageUrl,
  mbid,
  nowplaying,
  playCount,
  playTitle,
  siteUrl,
  subTitle,
  title,
}: ScrobblesCard) => {
  return (
    <div key={title} className='relative  rounded-lg'>
      <div
        key={title + mbid}
        className={`${
          nowplaying ? 'nowplaying ' : ''
        }relative h-80 md:h-85 bg-purple-dark rounded-lg`}
        style={{
          overflow: 'hidden',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <div className='absolute bottom-0 left-0 pb-0 mb-2'>
          {playCount ? (
            <h3 className='p-2 text-3xl font-normal text-white bg-black w-min bg-opacity-60'>
              {playCount}
              <span className='pl-2 text-sm font-light text-white'>plays</span>
            </h3>
          ) : null}{' '}
          {nowplaying ? (
            <h3 className='p-2 text-base font-normal text-white bg-orange bg-opacity-60 rounded-tr-lg rounded-br-lg'>
              🎹 Now playing
            </h3>
          ) : null}
          {subTitle ? (
            <h2 className='p-2 text-l font-light text-white bg-black bg-opacity-50 rounded-tr-lg '>
              <Link href={imageUrl ?? ''}>
                <a>{subTitle}</a>
              </Link>
            </h2>
          ) : null}
          <h2 className='p-2 text-2xl font-light text-white bg-black bg-opacity-40 rounded-br-lg'>
            <Link href={siteUrl ?? '#'}>
              <a>{title}</a>
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ScrobblesCard;
