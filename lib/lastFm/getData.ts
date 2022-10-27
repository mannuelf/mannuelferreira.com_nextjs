import fetch from 'node-fetch';

export const getData = async (url: string) =>
  await fetch(`${url}`)
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log('🔥', error))
    .finally(() => {});
