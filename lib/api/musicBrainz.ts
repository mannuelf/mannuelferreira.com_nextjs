import { CMS_NAME, EMAIL } from '@shared/constants';
import axios from 'axios';

export function getAllArtistImages(data: []): void {
  const { topartists } = data;
  const artists = topartists.artist;
  returnArtistImageUrls(artists);
}

export async function returnArtistImageUrls(artists: []) {
  let imagePaths;
  const baseUrl = 'https://musicbrainz.org/ws/2/artist';
  const format = '?inc=url-rels&fmt=json';
  const wikiBaseURL = 'https://commons.wikimedia.org/wiki/File:';
  const wikiRedirectURL =
    'https://commons.wikimedia.org/wiki/Special:Redirect/file/';

  for (let i = 0; i < artists.length; i++) {
    if (artists[i]['image'] && artists[i]['mbid']) {
      try {
        const options = {
          method: 'GET',
          url: `${baseUrl}/${artists[i]['mbid']}/${format}`,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'mannuelferreira.com/0.0.1 mannuel@themwebs.me',
          },
        };
        const response = await axios.get<any[]>(options.url, options);
        const result = await response.data.relations;

        console.log('🚀', result);
        /*for (let j = 0; j < result.length; i++) {
          console.log('🚀', result[i]);
          if (result[i] && result[i].type === 'image') {
            let imgUrl = result[i].url.resource;
            if (imgUrl.startsWith(wikiBaseURL)) {
              const fileName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1);
              imgUrl = `${wikiRedirectURL}${fileName}`;
            }
            console.log(`🎹  ${imgUrl}`);
          }
        }*/
      } catch (error) {
        console.log('🔥', error);
      }
    }
  }
}
