import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ARTIST_ENDPOINT } from '@lib/api/lastFm';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<TopArtists>,
) => {
  if (req.method === 'GET') {
    try {
      const response = axios({ url: ARTIST_ENDPOINT, method: 'GET' });
      const { data } = await response;
      res.status(200).json(data);
    } catch (error) {
      console.error(`${error}`);
      throw new Error(`${error}`);
    }
  }
};

export default handler;
