import fetch, { Response } from 'node-fetch';

const fetchData = async (url: string) =>
  await fetch(`${url}`)
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log('🔥 Uh oh...', error))
    .finally(() => console.log('🏁 Finished.'));

export default fetchData;
