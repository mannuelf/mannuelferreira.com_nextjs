import Image from "next/image";
import Link from "next/link";
import { ExperienceCardProps } from "./experience-card.types";

const ExperienceCard = ({ title, date, logo }: ExperienceCardProps) => {
  return (
    <>
      <div className="p-4 bg-white rounded border-2 border-gray">
        <h2 className="pb-1 text-xl text-black font-light">{title}</h2>
        <h3 className="pb-4 text-2xl text-black font-light">{date}</h3>
        <Image
          width={logo.width}
          height={logo.height}
          src={logo.href}
          alt={logo.title}
          style={{ margin: "0 auto" }}
        />
        <div className="pt-4">
          <Link href={logo.weblink}>
            {logo.title} <i className="text-sm fa-solid fa-arrow-up-right-from-square"></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ExperienceCard;
