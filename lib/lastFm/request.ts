import fetch, { Response } from 'node-fetch';
import config from './config';

const request = async (method: string, user: string = '') => {
  const url = `${config.base_url}?method=${method}${user ? '&user=' : ''}${user}&api_key=${config.api_key}&format=${
    config.format.json
  }`;
  return await fetch(url)
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log('🔥 Uh oh...', error));
};

export default request;
