import Container from "@/components/container";
import ExperienceCard from "@/components/experience-card/experience-card";
import { ExperienceCardProps } from "@/components/experience-card/experience-card.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { AVATAR_ME, GENERIC_META } from "@/lib/constants";
import { ExperienceCardItems } from "@/lib/experience-card.data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description: GENERIC_META,
};

export default async function AboutPage(): Promise<React.ReactElement> {
  return (
    <Container>
      <section className="flex items-start gap-4 md:justify-between md:gap-8">
        <div className="flex-1 space-x-4">
          <h1 className="inline-block text-4xl font-black lg:text-5xl">About Me</h1>
        </div>
      </section>

      <hr className="my-8" />

      <section className="flex flex-col md:flex-row items-center gap-8 md:items-start">
        <div className="flex flex-col gap-2 min-w-48 max-w-48">
          <Avatar className="w-48 h-48">
            <AvatarImage src={AVATAR_ME} alt={siteConfig.author} />
            <AvatarFallback>MF</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-center break-words">{siteConfig.author}</h2>
          <p className="text-center break-words text-muted-foreground">{siteConfig.occupation}</p>
        </div>
        <p className="py-4 text-lg">{GENERIC_META}</p>
      </section>

      <hr className="my-8" />

      <section className="grid-rows-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-center ">
        {ExperienceCardItems
          ? ExperienceCardItems.map((experience: ExperienceCardProps) => (
              <ExperienceCard key={experience.title} {...experience} />
            ))
          : null}
      </section>
    </Container>
  );
}
