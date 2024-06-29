import { CMS_NAME } from "@/lib/constants";
import styles from "./logo-image.module.css";
import Image, { ImageProps } from "next/image";
import srcLight from "../public/static/mf-logo.svg";
import srcDark from "../public/static/mf-logo-dark.svg";

type Props = Omit<ImageProps, "src" | "priority" | "loading"> & {
  srcLight: string;
  srcDark: string;
};

export const LogoImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className={styles.imgLight} alt={CMS_NAME} />
      <Image {...rest} src={srcDark} className={styles.imgDark} alt={CMS_NAME} />
    </>
  );
};
