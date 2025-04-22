import Image from "next/image";
import Link from "next/link";

type ScrobblesCard = {
  imageUrl?: string;
  mbid?: string;
  nowplaying?: string;
  playCount?: string;
  playTitle: string;
  siteUrl: string;
  subTitle?: string;
  title: string;
};

const ScrobblesCard = ({
  imageUrl,
  mbid,
  nowplaying,
  playCount,
  playTitle,
  siteUrl,
  subTitle,
  title,
}: ScrobblesCard) => {
  return (
    <div key={title} className="scrobble-card relative rounded-lg">
      <div
        key={title + mbid}
        className={`${nowplaying ? "nowplaying " : ""
          }relative h-80 md:h-85 bg-white rounded-lg overflow-hidden`}
      >
        {imageUrl ? (
          <Image
            blurDataURL={imageUrl}
            placeholder="blur"
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : null}
        <div className="absolute bottom-0 left-0 pb-0 mb-2">
          <span className="grid gap-4	p-2 text-xs font-light text-white rounded-br-lg">
            <a
              href={`https://music.apple.com/us/search?term=${title}${" "}${subTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mr-2"
            >
              <Image
                src={"/assets/icons/icon-apple.svg"}
                alt="Apple Music"
                width={20}
                height={20}
              />
            </a>
            <a
              href={`https://www.beatport.com/search?q=${title}${" "}${subTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mr-2"
            >
              <Image
                src={"/assets/icons/icon-beatport.svg"}
                alt="Beatport"
                width={20}
                height={20}
              />
            </a>
            <a
              href={`https://www.deezer.com/search/${title}${" "}${subTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mr-2"
            >
              <Image src={"/assets/icons/icon-deezer.svg"} alt="Deezer" width={20} height={20} />
            </a>
            <a
              href={`https://open.spotify.com/search/${title}${" "}${subTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mr-2"
            >
              <Image src={"/assets/icons/icon-spotify.svg"} alt="Spotify" width={20} height={20} />
            </a>
            <a
              href={`https://listen.tidal.com/search?q=${title}${" "}${subTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mr-2"
            >
              <Image src={"/assets/icons/icon-tidal.svg"} alt="TIDAL" width={20} height={20} />
            </a>
            <a
              href={`https://music.youtube.com/search?q=${title}${" "}${subTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mr-2"
            >
              <Image src={"/assets/icons/icon-youtube.svg"} alt="YouTube" width={20} height={20} />
            </a>
          </span>
          {playCount ? (
            <h3 className="p-2 text-2xl font-normal text-white bg-black w-min bg-opacity-60 rounded-tr-lg">
              {playCount}
              <span className="pl-2 text-sm font-light text-white">plays</span>
            </h3>
          ) : null}{" "}
          {nowplaying ? (
            <h3 className="p-2 text-xs font-normal text-white rounded-tr-lg rounded-br-lg">
              🎹 Playing
            </h3>
          ) : null}
          {subTitle ? (
            <h2 className="p-2 text-l font-light text-white bg-black bg-opacity-50 rounded-tr-lg">
              <Link href={imageUrl ?? ""}>{subTitle}</Link>
            </h2>
          ) : null}
          <h2 className="p-2 text-xl font-semibold text-white bg-black bg-opacity-40 rounded-br-lg">
            <Link href={siteUrl ?? "#"}>{title}</Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ScrobblesCard;