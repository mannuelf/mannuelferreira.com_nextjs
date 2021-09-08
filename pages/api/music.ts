import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ARTIST_ENDPOINT } from '@lib/api/lastFm';
import artistImages from '@lib/api/artistImages';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === 'GET') {
    const data = await getTopArtists();
    res.status(200).json(data);
  }
};

export const getTopArtists = async (): Promise<TopArtists> => {
  try {
    const response = axios({ url: ARTIST_ENDPOINT, method: 'GET' });
    const { data } = await response;
    data['images'] = artistImages;
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default handler;
