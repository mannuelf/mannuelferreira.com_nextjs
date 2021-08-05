import React, { useEffect, useState, FC } from 'react';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Image from 'next/image';
import axios from 'axios';
import Layout from '@components/Layout/layout';
import PageTitle from '@components/page-title';
import Container from '@components/container';

type Props = {
  music: TopArtists | null;
  error: string;
  loading: boolean;
};

const Music = ({ music, loading, error }: Props) => {
  const [data, setData] = useState<Props>([]);
  const [isLoading, setIsLoading] = useState<Props>(true);
  const [isError, setIsError] = useState<Props>('');

  useEffect(() => {
    setIsLoading(loading);
    setIsError(error);
    setData(music);
  }, [music, loading]);

  console.log(typeof data, data);

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <Layout>
      <Container>
        <PageTitle>Music</PageTitle>
        {!data
          ? 'loading...'
          : data.topartists.artist.map((artist: Artist) => {
              return (
                <div key={artist.mbid}>
                  <Image
                    src={artist.image[3]['#text']}
                    alt={artist.name}
                    width={256}
                    height={256}
                  />
                  <h1>{artist.name}</h1>
                </div>
              );
            })}
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  let music;
  let loading = true;
  let error = '';

  try {
    const res = await axios(`${process.env.npm_package_proxy}/api/music`);
    music = await res.data;
    loading = false;
  } catch (error) {
    error = error;
    loading = false;
    console.error(`Ooops ${error}`);
  }

  return {
    props: {
      music,
      error,
      loading,
    },
    revalidate: 60,
  };
};

export default Music;
