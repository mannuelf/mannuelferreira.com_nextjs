import {MenuItems} from "./nav.types";

const menuItems: MenuItems = [
  { href: '/', text: 'Home', enabled: true },
  { href: '/posts', text: '📒 Posts', enabled: true },
  { href: '/experience', text: '💻 Experience', enabled: true },
  { href: '/books', text: '📚 Books', enabled: true },
].filter(menu =>  menu.enabled);


export default menuItems;
