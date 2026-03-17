import LastFmApi from "lastfm-nodejs-client";
import ScrobblesInfoModal from "./scrobblesInfoModal";

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

  return <ScrobblesInfoModal playcount={userProfile.user.playcount} />;
}
