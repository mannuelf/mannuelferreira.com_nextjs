import Head from 'next/head';

type Props = {
  ogImage: string;
  ogSiteName: string;
  ogTitle: string;
  ogDescription: string;
  ogTwitterCard: string;
  ogTwitterSite: string;
  ogTwitterCreator: string;
  ogUrl: string;
};

export default function MetaTags({
  ogImage,
  ogSiteName,
  ogTitle,
  ogDescription,
  ogTwitterCard,
  ogTwitterCreator,
  ogTwitterSite,
  ogUrl,
}: Props) {
  return (
    <Head>
      <title>
        {ogTitle} | {ogSiteName}
      </title>
      <meta property='og:image' content={ogImage} key='ogimage' />
      <meta property='og:site_name' content={ogSiteName} key='ogsitename' />
      <meta property='og:title' content={ogTitle} />
      <meta property='og:description' content={ogDescription} key='ogdesc' />
      <meta name='twitter:card' content={'summary_large_image'} />
      <meta name='twitter:site' content={ogTwitterSite} />
      <meta name='twitter:creator' content={ogTwitterCreator} />
      <meta property='og:url' content={ogUrl} key='ogurl' />
    </Head>
  );
}
