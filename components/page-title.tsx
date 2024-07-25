import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const PageTitle = ({ children }: Props) => {
  const styles =
    "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight md:leading-none mb-3 text-left";
  return <h1 className={styles}>{children}</h1>;
};

export default PageTitle;
