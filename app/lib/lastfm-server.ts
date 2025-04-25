import LastFmApi from "lastfm-nodejs-client";
import { LASTFM_CONFIG } from "../config/lastfm";

const lastFm = LastFmApi();
const { method } = lastFm;

export async function getRecentTracks(limit: number = 50) {
  const data = await lastFm.getRecentTracks(
    method.user.getRecentTracks,
    LASTFM_CONFIG.USER!,
    "",
    limit.toString(),
  );
  return data.recenttracks;
}

export async function getTopAlbums(limit: number = 50) {
  const data = await lastFm.getTopAlbums(
    method.user.getTopAlbums,
    LASTFM_CONFIG.USER!,
    "overall",
    limit.toString(),
  );
  return data.topalbums;
}

export async function getWeeklyAlbums(limit: number = 22) {
  const data = await lastFm.getWeeklyAlbumChart(
    method.user.getWeeklyAlbumChart,
    LASTFM_CONFIG.USER!,
    "overall",
    limit.toString(),
  );
  return data.weeklyalbumchart;
}

export async function getTopArtists(limit: number = 50) {
  const data = await lastFm.getTopArtists(
    method.user.getTopArtists,
    LASTFM_CONFIG.USER!,
    "overall",
    limit.toString(),
  );
  return data.topartists;
}
