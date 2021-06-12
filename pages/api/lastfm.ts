import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  name: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: `${process.env.NEXT_PUBLIC_LASTFM_APPNAME}` });
};

export default handler;
