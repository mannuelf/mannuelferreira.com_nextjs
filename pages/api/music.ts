import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ARTIST_ENDPOINT } from '@lib/api/lastFm';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    const data = await getTopArtists();
    res.status(200).json(data);
  }
};

export const getTopArtists = async (): Promise<TopArtistsResponse> => {
  try {
    const response = axios({ url: ARTIST_ENDPOINT, method: 'GET' });
    const { data } = await response;
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default handler;
