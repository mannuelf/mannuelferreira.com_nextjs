"use client";

import type { UserTopTag } from "lastfm-nodejs-client/dist/@types/lastfm.types";
import { motion } from "framer-motion";
import { useUserTopTags } from "../_hooks/useScrobbles";

export default function TopTags() {
  const { data, isLoading, error } = useUserTopTags(50);

  if (error) return <div>Error loading top tags</div>;

  const tags: UserTopTag[] = data?.tag ?? [];
  const maxCount = tags.length ? Math.max(...tags.map((t) => Number(t.count))) : 1;

  const fontSize = (count: number) => {
    const ratio = Number(count) / maxCount;
    // scale between 0.75rem and 2rem
    return `${0.75 + ratio * 1.25}rem`;
  };

  return (
    <div className="pb-8">
      <div className="pb-4 pl-4" id="#toptags">
        <h2 className="text-2xl font-medium">Top Tags</h2>
        <p className="text-sm text-muted-foreground">Genres and tags I listen to most</p>
      </div>
      <motion.div
        className="flex flex-wrap gap-3 px-4"
        initial="hidden"
        animate={isLoading ? "hidden" : "visible"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
        }}
      >
        {tags.map((tag, index) => (
          <motion.a
            key={`${tag.name}-${index}`}
            href={tag.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ fontSize: fontSize(tag.count) }}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer leading-tight"
          >
            {tag.name}
            <span className="ml-1 text-xs opacity-50">{tag.count}</span>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
