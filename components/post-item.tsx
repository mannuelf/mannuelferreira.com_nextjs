import { cn, formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { Tag } from "./tag";
import { buttonVariants } from "./ui/button";
import Image from "next/image";

interface PostItemProps {
  slug: string;
  title: string;
  coverImage: string;
  excerpt: string;
  date: string;
  tags: string[];
}

export function PostItem({
  slug,
  title,
  coverImage,
  excerpt,
  date,
  tags,
}: PostItemProps): React.ReactElement {
  return (
    <article className="flex flex-col gap-2 py-3 p-5 m-0 mb-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-2 border-gray hover:border-orange-400 rounded-md transition-all">
      <div className="flex justify-between items-center">
        <Link href={"/" + slug}>
          <Image
            src={coverImage}
            alt={title}
            width={480}
            height={270}
            className="w-full h-full rounded-md object-cover"
          />
        </Link>
      </div>
      <div>
        <h2 className="text-2xl font-bold">
          <Link href={"/" + slug}>{title}</Link>
        </h2>
      </div>
      <div className="flex gap-2">
        {tags.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      <div className="max-w-none text-muted-foreground">{excerpt}</div>
      <div className="flex justify-between items-center">
        <dl>
          <dt className="sr-only">Published On</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{formatDate(date)}</time>
          </dd>
        </dl>
        <Link href={"/" + slug} className={cn(buttonVariants({ variant: "link" }), "py-0")}>
          Read
        </Link>
      </div>
    </article>
  );
}
