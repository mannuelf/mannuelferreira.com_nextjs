import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_LASTFM_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY;

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  const ENDPOINT = `${BASE_URL}/?method=auth.getToken&api_key=${API_KEY}&format=json`;
  const response = axios.post(ENDPOINT);
  const { data } = await response;
  const responseToken = data.token;
  res.status(200).json({ token: responseToken });
};

export default auth;
