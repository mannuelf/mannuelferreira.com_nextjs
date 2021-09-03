import React, { useEffect, useState, FC } from 'react';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Image from 'next/image';
import axios from 'axios';
import Layout from '@components/Layout/layout';
import PageTitle from '@components/page-title';
import Container from '@components/container';

type Props = {
  music: TopArtists;
  error: string;
  photos: string[];
};

const Music = ({ music, photos, error }: Props) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    setIsError(error);
    setData(music);
    setImages(photos);
  }, [music, error, photos]);

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
        <div className='grid grid-flow-row-dense grid-cols-4 grid-rows-4 gap-0 auto-cols-max'>
          {music &&
            music?.map((artist: Artist, index: number) => (
              <div key={index} className='static relative'>
                <Image
                  className='absolute bottom-0 left-0'
                  src={artist.image[3]['#text']}
                  alt={artist.name}
                  width={256}
                  height={256}
                />
                <div className='absolute bottom-0 left-0'>
                  <h2>{artist.name}</h2>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  let music;
  let error = '';
  let photos: string[] = [];
  try {
    const response = await axios(`${process.env.npm_package_proxy}/api/music`);
    music = await response.data.topartists.artist;
  } catch (error) {
    error = error;
    console.error(`Ooops ${error}`);
  }

  return {
    props: {
      music,
      error,
      photos,
    },
    revalidate: 10000,
  };
};

export default Music;
