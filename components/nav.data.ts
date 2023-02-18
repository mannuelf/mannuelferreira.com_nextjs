import {MenuItems} from "./nav.types";

const menuItems: MenuItems = [
  { href: '/', text: 'Home', enabled: true },
  { href: '/posts', text: 'My posts', enabled: true },
  { href: '/experience', text: 'My experience', enabled: true },
  { href: '/books', text: 'My library', enabled: true },
].filter(menu =>  menu.enabled);


export default menuItems;
