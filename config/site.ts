import {
  CMS_AUTHOR,
  CMS_NAME,
  GENERIC_META,
  GITHUB_URL,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/lib/constants";

export const siteConfig = {
  name: CMS_NAME,
  url: SITE_URL,
  description: GENERIC_META,
  author: CMS_AUTHOR,
  links: {
    twitter: `https://x.com/${TWITTER_HANDLE}`,
    github: GITHUB_URL,
    personalSite: SITE_URL,
  },
};

export type SiteConfig = typeof siteConfig;
