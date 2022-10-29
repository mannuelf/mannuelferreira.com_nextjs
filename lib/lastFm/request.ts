import fetch, { RequestInit } from 'node-fetch';
import config from './config';

const request = async <Parameters, Response>(method: string, user: string = '', limit?: number): Promise<Response> => {
  const url = `
      ${config.base_url}?method=${method}${user ? '&user=' : ''}${user}${limit ? '&limit=' : ''}${limit}&api_key=${
    config.api_key
  }&format=${config.format.json}`;
  console.log('🍓 url', url);

  return await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log('🔥 Uh oh...', error));
};

export default request;
