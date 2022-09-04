export type ExperienceCardProps = {
  title: string;
  date: string;
  logo: Logo;
}[];

type Logo = {
  title: string;
  href: string;
  width: number;
  height: number;
};
