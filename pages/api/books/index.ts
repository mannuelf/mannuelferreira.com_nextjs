import fetch from 'cross-fetch';
import { RequestMethod } from '@api/server.types';
import type { NextApiRequest, NextApiResponse } from 'next';
import BOOKS from './books.json';
import { Book } from './book.types';

const readBooks = BOOKS.filter(books => books['read-count'] >= 1);

const API_BASE_URL = `http://covers.openlibrary.org/b/isbn/`;
const coverSize = {
  S: 'S', M: 'M', L: 'L'
}

const fetchBookCovers = async (books: Book[]) => {
  for (let i = 0; i < (books.length); i++) {
    const book = books[i];
    const { ISBN, ISBN13, cover } = book;

    if (cover !== null) {
      continue;
    }

    const url = `${API_BASE_URL}${ISBN ?? ISBN13}-${coverSize.M}.jpg`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const imageUrl =  url;
        book.cover =  imageUrl;
      }
    } catch (error) {
      console.log(`🔥 Failed to fetch cover for book with ISBN ${ISBN}: ${error}`);
    }
  }

  return books;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === RequestMethod.GET) {
    const books = await fetchBookCovers(readBooks);
    res.status(200).json(books)
  }
}
