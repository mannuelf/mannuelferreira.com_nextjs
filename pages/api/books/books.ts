import { NextApiRequest, NextApiResponse } from 'next';
import type { Books } from './books.types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    res.status(200).json({ name: 'Hello There' })
  }
}
