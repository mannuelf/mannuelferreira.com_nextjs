import {
  LOGO_LASTFM,
  URL_COVER_ART_ARCHIVE,
  URL_FANARTTV,
  URL_LASTFM_API_DOCS,
  URL_LASTFM_NPM_PKG,
  URL_TWITTER_PROFILE,
} from "@/lib/constants";
import LastFmApi from "lastfm-nodejs-client";
import Image from "next/image";

type UserResponse = {
  user: {
    playcount: string;
    name: string;
    url: string;
  };
};

export const dynamic = "force-dynamic";

export async function getUser() {
  const lastFm = LastFmApi();
  const { config, method } = lastFm;

  try {
    const data = await lastFm.getInfo(method.user.getInfo, config.username);
    return data as UserResponse;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export default async function UserProfile() {
  const userProfile = await getUser();

  if (!userProfile?.user) return null;

  return (
    <div className="pt-4 mt-8 mb-16 border-t">
      <p className="text-lg">
        My love for collecting music has brought me to keep using lastFm. I have been tracking my
        listening habits with lastFm since 2008. I have always wanted to play with the data, that is
        what this page is about. I of course want to share what I have been listening to with you
        all.
      </p>
      <p>
        If code is what interests you read it{" "}
        <a
          href="https://github.com/mannuelf/mannuelferreira.com_nextjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <i className="fab fa-github"></i> here.
        </a>{" "}
      </p>
      <p>
        I have built an API wrapper to the lastFM API in TypeScript, if you want to build something
        similar the client may help.{" "}
        <a href={URL_LASTFM_NPM_PKG} target="_blank" rel="noopener noreferrer">
          GET IT HERE
        </a>
      </p>
      <p>
        My scrobbles from {""}
        <a href={URL_LASTFM_API_DOCS} target="_blank" rel="noopener noreferrer">
          <Image src={LOGO_LASTFM} unoptimized={true} width={90} height={26} alt="LastFm Logo" />
        </a>
        {userProfile?.user ? (
          <>
            Total plays:{" "}
            <span className="text-4xl font-bold text-red-600 ">{userProfile.user.playcount}</span>.
          </>
        ) : null}
      </p>
      <p>
        Some photos from{" "}
        <a href={URL_FANARTTV} target="_blank" rel="noopener noreferrer">
          fanart.tv
        </a>{" "}
        API, some from{" "}
        <a href={URL_COVER_ART_ARCHIVE} target="_blank" rel="noopener noreferrer">
          Musicbrainz Cover Art Archive
        </a>
        . Unfortunately not all album artwork is available through Musicbrainz or FanartTv. If you
        know of another API{" "}
        <a href={URL_TWITTER_PROFILE} target="_blank" rel="noopener noreferrer">
          let me know about it
        </a>
        .🤙
      </p>
    </div>
  );
}
