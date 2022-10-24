import fetch from 'node-fetch';

const LastFm = () => {
  const getInfo = async (url: string) => {
    console.log('🎹', url);
    const response = await fetch(`${url}`);
    const data = await response.json();
    return data;
  };

  return {
    getInfo,
  };
};

export default LastFm;
