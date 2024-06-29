import {
  ICON_CODEPEN,
  ICON_GITHUB,
  ICON_LINKEDIN,
  ICON_MICROSOFT,
  ICON_TWITTER,
  ICON_YOUTUBE,
  LOGO_LARCASTS,
  URL_CODEPEN_PROFILE,
  URL_GITHUB_PROFILE,
  URL_LARACASTS,
  URL_LINKEDIN_PROFILE,
  URL_MICROSOFT_PROFILE,
  URL_TWITTER_PROFILE,
  URL_YOUTUBE_CHANNEL,
} from "@/lib/constants";
import Image from "next/image";

export default function FooterSocial() {
  return (
    <div className="w-full text-left md:w-1/2">
      <h3 className="pb-3 text-2xl font-medium">Follow me</h3>
      <ul className="flex">
        <li className="pr-4">
          <a href={URL_TWITTER_PROFILE} target="_blank" rel="noopener noreferrer">
            <span>
              <img src={ICON_TWITTER} alt="twitter" width={28} height={28} />
            </span>
          </a>
        </li>
        <li className="pr-4">
          <a href={URL_LINKEDIN_PROFILE} target="_blank" rel="noopener noreferrer">
            <span>
              <img src={ICON_LINKEDIN} alt="LinkedIn" width={28} height={28} />
            </span>
          </a>
        </li>

        <li className="pr-4">
          <a href={URL_GITHUB_PROFILE} target="_blank" rel="noopener noreferrer">
            <span>
              <img src={ICON_GITHUB} alt="Github" width={28} height={28} />
            </span>
          </a>
        </li>
        <li className="pr-4">
          <a href={URL_MICROSOFT_PROFILE} target="_blank" rel="noopener noreferrer">
            <span>
              <img src={ICON_MICROSOFT} alt="Windows" width={28} height={28} />
            </span>
          </a>
        </li>
        <li className="pr-4">
          <a href={URL_CODEPEN_PROFILE} target="_blank" rel="noopener noreferrer">
            <span>
              <img src={ICON_CODEPEN} alt="CODEPEN" width={28} height={28} />
            </span>
          </a>
        </li>
        <li className="pr-4">
          <a href={URL_LARACASTS} target="_blank" rel="noopener noreferrer">
            <span>
              <Image src={LOGO_LARCASTS} alt="Larcasts" width={28} height={28} />
            </span>
          </a>
        </li>
        <li className="pr-4">
          <a href={URL_YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer">
            <span>
              <img src={ICON_YOUTUBE} alt="YouTube" width={28} height={28} />
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}
