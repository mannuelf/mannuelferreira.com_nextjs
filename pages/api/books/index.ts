import { RequestMethod } from '@api/server.types';
import type { NextApiRequest, NextApiResponse } from 'next';
import BOOKS from './books.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === RequestMethod.GET) {
    res.status(200).json(BOOKS)
  }
}
