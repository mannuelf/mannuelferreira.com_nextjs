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
};

const Music = ({ music, error }: Props) => {
  const [data, setData] = useState<Props>([]);
  const [isError, setIsError] = useState<Props>('');

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

  console.log('music', music);
  return (
    <Layout>
      <Container>
        <PageTitle>Music</PageTitle>
        {music &&
          music.topartists.artist.map((artist: Artist) => (
            <div key={artist.mbid}>
              <Image
                src={artist.image[3]['#text']}
                alt={artist.name}
                width={256}
                height={256}
              />
              <h1>{artist.name}</h1>
            </div>
          ))}
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  let music;
  let error = '';

  try {
    const res = await axios(`${process.env.npm_package_proxy}/api/music`);
    music = await res.data;
  } catch (error) {
    error = error;
    console.error(`Ooops ${error}`);
  }

  return {
    props: {
      music,
      error,
    },
    revalidate: 60,
  };
};

export default Music;
