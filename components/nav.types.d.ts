export type NavProps = {
  position: string;
};

export type MenuItems = MenuItem[];

export type MenuItem = {
  href: string;
  text: string;
  enabled: boolean;
};
