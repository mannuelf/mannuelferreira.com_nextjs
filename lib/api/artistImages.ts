const artistImages = [
  {
    name: 'Led Zeppelin',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/d/d3/Jimmy_Page_with_Robert_Plant_2_-_Led_Zeppelin_-_1977.jpg',
    attribution:
      'Jim Summaria, http://www.jimsummariaphoto.com/, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons',
  },
  {
    name: 'Nightmares on Wax',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/0/0d/Nightmares_on_Wax_-_2018-02-15_-_La_Bellevilloise%2C_Paris_%281%29.jpg',
    attribution:
      'Like tears in rain, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons',
  },
  {
    name: 'Eric Clapton',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/0/0e/EricClaptonCrash12002.jpg',
    attribution:
      'Ericclapton007, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons',
  },
  {
    name: 'Talking Heads',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/1/1d/Talkin%27HeadsELMO.jpg',
    attribution:
      'Plismo, CC BY 3.0 <https://creativecommons.org/licenses/by/3.0>, via Wikimedia Commons',
  },
  {
    name: 'Bugge Wesseltoft',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/f/fd/Bugge_Wesseltoft_Cosmopolite_%28213414%29.jpg',
    attribution:
      'Tore Sætre, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons',
  },
  {
    name: 'Snoop Dogg',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/3/33/Snoop_Dogg_%28140742005%29.jpeg',
    attribution:
      'Remy Golinelli, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons',
  },
  {
    name: 'De La Soul',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/0/05/De_La_Soul_Grandoozy_2018_%2844535924624%29.jpg',
    attribution:
      'Julio Enriquez from Denver,CO, USA, CC BY 2.0 <https://creativecommons.org/licenses/by/2.0>, via Wikimedia Commons',
  },
  {
    name: 'Pink Floyd',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/5/57/PinkFloyd1973.jpg',
    attribution:
      'TimDuncan, CC BY 3.0 <https://creativecommons.org/licenses/by/3.0>, via Wikimedia Commons',
  },
  {
    name: 'The Notorious B.I.G.',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/6/6c/The_Notorious_B.I.G._%288111820251%29.jpg',
    attribution:
      'InSapphoWeTrust, CC BY-SA 2.0 <https://creativecommons.org/licenses/by-sa/2.0>, via Wikimedia Commons',
  },
  {
    name: 'Gorillaz',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/c/c2/Gorillaz%2C_Brixton_Academy%2C_London_%2834342295764%29.jpg',
    attribution:
      'Drew de F Fawkes, CC BY 2.0 <https://creativecommons.org/licenses/by/2.0>, via Wikimedia Commons',
  },
  {
    name: 'The Beatles',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/9/9f/Beatles_ad_1965_just_the_beatles_crop.jpg',
    attribution: 'EMI., Public domain, via Wikimedia Commons',
  },
  {
    name: 'Prince',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/c/c1/Prince_at_Coachella.jpg',
    attribution:
      'penner, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons',
  },
  {
    name: 'DANGERDOOM',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/f/fa/MF_Doom_-_23_July_2011_01.jpg',
    attribution:
      'possan, CC BY 2.0 <https://creativecommons.org/licenses/by/2.0>, via Wikimedia Commons',
  },
  {
    name: 'Hot Chip',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/5/5a/Hot_chip_at_the_parish_%28114897386%29.jpg',
    attribution: '',
  },
  {
    name: 'Matthew Dear',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Matthew_Dear_-_Roskilde_Festival_2011.jpg',
    attribution:
      'Charlie Llewellin from Austin, USA, CC BY-SA 2.0 <https://creativecommons.org/licenses/by-sa/2.0>, via Wikimedia Commons',
  },
  {
    name: 'Depeche Mode',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/7/71/DUBPECHE_MODE.JPG',
    attribution: 'Dubpechemode, Public domain, via Wikimedia Commons',
  },
  {
    name: 'Erik Sumo',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/T%C3%B6vish%C3%A1zi_Ambrus.jpg',
    attribution:
      'Macskapocs, CC BY-SA 2.0 <https://creativecommons.org/licenses/by-sa/2.0>, via Wikimedia Commons',
  },
  {
    name: 'Bob Marley & The Wailers',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/6/61/Bob-marley-wailers-crystal-palace.jpg',
    attribution:
      'Tankfield, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons',
  },
  {
    name: 'Jamie Lidell',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/7/7c/Jamie_lidell_DSC_0140_5602_%284799412667%29.jpg',
    attribution:
      'tmmmb from belgium, CC BY 2.0 <https://creativecommons.org/licenses/by/2.0>, via Wikimedia Commons',
  },
  {
    name: 'Burial',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Burial.jpg',
    attribution:
      'Burial, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons',
  },
];

export default artistImages;
