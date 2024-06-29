import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { AVATAR_ME, GENERIC_META } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description: GENERIC_META,
};

export default async function AboutPage() {
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-x-4">
          <h1 className="inline-block text-4xl font-black lg:text-5xl">About Me</h1>
        </div>
      </div>
      <hr className="my-8" />
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
        <div className="flex flex-col gap-2 min-w-48 max-w-48">
          <Avatar className="w-48 h-48">
            <AvatarImage src={AVATAR_ME} alt={siteConfig.author} />
            <AvatarFallback>MF</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-center break-words">{siteConfig.author}</h2>
          <p className="text-center break-words text-muted-foreground">Software Developer</p>
        </div>
        <p className="py-4 text-lg text-muted-foreground">{GENERIC_META}</p>
      </div>
    </div>
  );
}
