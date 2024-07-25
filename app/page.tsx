import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { buttonVariants } from "@/components/ui/button";
import { cn, sortPosts } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);

  return (
    <>
      <section className="pt-6 pb-8 space-y-6 md:pb-12 md:mt-2 lg:py-32">
        <div className="container flex flex-col gap-4 text-center">
          <h1 className="text-3xl font-black sm:text-5xl md:text-6xl lg:text-6xl text-balance">
            Hello world
          </h1>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
            Welcome to my blog where I write about web development, programming, and other
            tech-related things.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/posts" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}>
              Start reading
            </Link>
          </div>
        </div>
      </section>
      <section className="container flex flex-col max-w-6xl py-6 mt-10 space-y-6 lg:py-6">
        <h2 className="text-4xl font-black text-center sm:text-5xl md:text-4xl lg:text-6xl">
          Latest Posts
        </h2>
        <ul className="flex flex-col">
          {latestPosts.map(
            (post) =>
              post.published && (
                <li key={post.slug} className="first:border-t first:border-border">
                  <PostItem
                    slug={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    tags={post.tags}
                  />
                </li>
              ),
          )}
        </ul>
      </section>
    </>
  );
}
