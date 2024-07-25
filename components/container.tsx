import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => (
  <div className="container max-w-6xl py-6 lg:py-10">{children}</div>
);

export default Container;
