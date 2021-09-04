import React, { useEffect, useState, FC } from 'react';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Image from 'next/image';
import axios from 'axios';
import Layout from '@components/Layout/layout';
import PageTitle from '@components/page-title';
import Container from '@components/container';

type Props = {
  music: TopArtists | any;
  error: string;
};

const Music = ({ music, error }: Props) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    setIsError(error);
    setData(music);
  }, [music, error]);

  if (error)
    return (
      <Layout>
        <Container>
          <h1>Error: {error}</h1>
        </Container>
      </Layout>
    );

  return (
    <Layout>
      <Container>
        <PageTitle>Music</PageTitle>
        <div className='border-t pt-4 mt-8 mb-8'>
          <p className='text-lg'>
            I love music, I have been tracking my habits with lastFm, according
            to their data these are my all time favourites.
          </p>
        </div>
        <div className='grid grid-flow-row-dense sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-4 gap-0'>
          {music &&
            music?.map((artist: Artist, index: number) => (
              <div
                key={index}
                className='static relative h-72 bg-purple-dark'
                style={{
                  backgroundSize: 'cover',
                  backgroundPosition: 'top center',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url(${artist?.cover[0]?.photo})`,
                }}
              >
                <div className='absolute bottom-0 left-0 pb-0'>
                  <h2 className='text-3xl font-light text-white pl-2 pb-2'>
                    {artist.name}
                  </h2>
                  <h3 className='text-4xl font-normal text-white w-min p-2 bg-purple-600 bg-opacity-40'>
                    {artist.playcount}
                    <span className='text-xs font-light text-white pl-2 '>
                      plays
                    </span>
                  </h3>
                </div>
              </div>
            ))}
        </div>
        <div className='border-t pt-4 mt-8 mb-16'>
          <p>
            All data courtesy of the{' '}
            <a href='https://www.last.fm/api/intro'>LastFm API</a>.
          </p>
          <Image
            src='https://res.cloudinary.com/mannuel/image/upload/v1630704533/images/Lastfm_logo.svg'
            unoptimized={true}
            width={90}
            height={30}
            alt='LastFm Logo'
          />
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  let music: [] = [];
  let error = '';
  let photos: [] = [];

  try {
    const response = await axios(`${process.env.npm_package_proxy}/api/music`);
    music = await response.data.topartists.artist;
    photos = await response.data.images;

    const toMerge = [...music, ...photos];
    let set = new Set();

    let mergedArtistInfo: any = toMerge.filter((artist: any) => {
      if (!set.has(artist.name)) {
        set.add(artist.name);
        for (let item of music) {
          delete item['image'];
          if (artist.name === item['name']) {
            item['cover'] = photos.filter(
              (photo) => photo.name === artist.name,
            );
          }
        }
        return true;
      }
      return false;
    }, set);

    music = mergedArtistInfo;
  } catch (error) {
    error = error;
    console.error(`Oops ${error}`);
  }

  return {
    props: {
      music,
      error,
    },
    revalidate: 86400,
  };
};

export default Music;
