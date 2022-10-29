import { User } from '@lib/lastFm/lastFm.types';
import {
  LOGO_LASTFM,
  URL_COVERART_ARCHIVE,
  URL_FANARTTV,
  URL_LASTFM_API_DOCS,
  URL_TWITTER_PROFILE,
} from '@shared/constants';
import Image from 'next/image';

type UserProps = {
  user?: User;
};

const ScrobblesIntro = ({ user }: UserProps) => {
  console.log('🔥 ', user);

  return (
    <>
      <div className='pt-4 mt-8 mb-16 border-t'>
        <p className='text-lg'>
          I love music and have been tracking my listening habits with lastFm since 2008. I have always wanted to play
          with their data, that is what this page is about and of course to share what I have been listening to with you
          all.
        </p>
        <p>
          My scrobbles from {''}
          <a href={URL_LASTFM_API_DOCS} target='_blank' rel='noopener noreferrer'>
            <Image src={LOGO_LASTFM} unoptimized={true} width={120} height={36} alt='LastFm Logo' />
          </a>
          {'  '}
          API.{' '}
          {user ? (
            <>
              Total plays: <span className='font-medium text-4xl text-red-600 '>{user?.playcount}</span>.
            </>
          ) : null}
        </p>
        <p>
          Some photos from{' '}
          <a href={URL_FANARTTV} target='_blank' rel='noopener noreferrer'>
            fanart.tv
          </a>{' '}
          API, some from{' '}
          <a href={URL_COVERART_ARCHIVE} target='_blank' rel='noopener noreferrer'>
            Musicbrainz Cover Art Archive
          </a>
          . Unfortunately not all album artwork is available through Musicbrainz or FanartTv. If you know of another API{' '}
          <a href={URL_TWITTER_PROFILE} target='_blank' rel='noopener noreferrer'>
            let me know about it
          </a>
          .🤙
        </p>
        <h2 className='text-2xl'></h2>
      </div>
    </>
  );
};

export default ScrobblesIntro;
