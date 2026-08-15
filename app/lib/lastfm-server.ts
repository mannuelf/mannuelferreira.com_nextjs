import LastFmApi from "lastfm-nodejs-client";
import { LASTFM_CONFIG } from "../config/lastfm";

const lastFm = LastFmApi();
const { method } = lastFm;

function periodToFrom(period: string): string | undefined {
  if (!period || period === "today") return undefined;
  const now = Math.floor(Date.now() / 1000);
  const map: Record<string, number> = {
    "7day": 7 * 24 * 60 * 60,
    "1month": 30 * 24 * 60 * 60,
    "3month": 90 * 24 * 60 * 60,
    "6month": 180 * 24 * 60 * 60,
    "12month": 365 * 24 * 60 * 60,
  };
  return map[period] ? String(now - map[period]) : undefined;
}

export async function getRecentTracks(limit: number = 50, period: string = "today") {
  const from = periodToFrom(period);
  const data = await lastFm.getRecentTracks(
    method.user.getRecentTracks,
    LASTFM_CONFIG.USER!,
    limit.toString(),
    from,
  );
  return data.recenttracks;
}

export async function getTopAlbums(limit: number = 50, period: string = "overall") {
  const data = await lastFm.getTopAlbums(
    method.user.getTopAlbums,
    LASTFM_CONFIG.USER!,
    period,
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

export async function getUserTopTags(limit: number = 50) {
  const data = await lastFm.getUserTopTags(
    method.user.getTopTags,
    LASTFM_CONFIG.USER!,
    limit.toString(),
  );
  return data.toptags;
}

export async function getLovedTracks(limit: number = 12) {
  const data = await lastFm.getLovedTracks(
    method.user.getLovedTracks,
    LASTFM_CONFIG.USER!,
    "",
    limit.toString(),
  );
  return data.lovedtracks;
}

export async function getTagTopTracks(tag: string, limit: number = 12) {
  const data = await lastFm.tag.tagTopTracks(
    method.tag.getTopTracks,
    tag,
    limit.toString(),
  );
  return data.tracks;
}

export async function getTopArtists(limit: number = 50, period: string = "overall") {
  const data = await lastFm.getTopArtists(
    method.user.getTopArtists,
    LASTFM_CONFIG.USER!,
    period,
    limit.toString(),
  );
  return data.topartists;
}
