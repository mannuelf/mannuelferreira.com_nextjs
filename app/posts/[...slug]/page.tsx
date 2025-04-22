import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { Tag } from "@/components/tag";
import { siteConfig } from "@/config/site";
import "@/styles/mdx.css";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
};

async function getPostFromParams(params: Props["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.excerpt,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${post.coverImage}`],
    },
  };
}

export async function generateStaticParams(): Promise<Props["params"][]> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: { params: { slug: string[] } }) {
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="container py-6 prose dark:prose-invert max-w-5xl mx-auto">
      <h1 className="mb-2">{post.title}</h1>
      <div className="flex gap-2 mb-2">{post.tags?.map((tag) => <Tag tag={tag} key={tag} />)}</div>
      {post.excerpt ? <p className="text-xl mt-0 text-muted-foreground">{post.excerpt}</p> : null}
      <hr className="my-4" />
      <MDXContent code={post.body} />
    </article>
  );
}
