import Head from 'next/head';

type Props = {
  ogDescription: string;
  ogImage: string;
  ogSiteName: string;
  ogTitle: string;
  ogTwitterCard: string;
  ogTwitterCreator: string;
  ogTwitterImage: string;
  ogTwitterSite: string;
  ogTwitterTitle: string;
  ogType?: string;
  ogUrl: string;
};

export default function MetaTags({
  ogDescription,
  ogImage,
  ogSiteName,
  ogTitle,
  ogTwitterCard,
  ogTwitterCreator,
  ogTwitterSite,
  ogUrl,
}: Props) {
  return (
    <Head>
      <title>{`${ogTitle} | ${ogSiteName}`}</title>
      <meta name='twitter:card' content={ogTwitterCard} />
      <meta name='twitter:creator' content={ogTwitterCreator} />
      <meta name='twitter:description' content={ogDescription} />
      <meta name='twitter:image' content={`${ogImage}?${Date.now()}`} />
      <meta name='twitter:site' content={ogTwitterSite} />
      <meta name='twitter:title' content={ogTitle} />
      <meta property='og:description' content={ogDescription} key='ogdesc' />
      <meta property='og:image' content={ogImage} key='ogimage' />
      <meta property='og:site_name' content={ogSiteName} key='ogsitename' />
      <meta property='og:title' content={ogTitle} />
      <meta property='og:url' content={ogUrl} />
      <meta property='og:type' content={'object'} />
      <meta property='og:image:type' content={'image/png'} />
    </Head>
  );
}
