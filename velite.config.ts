import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeMermaid from "rehype-mermaid";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import type { Pluggable } from "unified";
import { defineCollection, defineConfig, s } from "velite";

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      excerpt: s.string().max(999),
      coverImage: s.string(),
      date: s.isodate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()),
      body: s.mdx(),
    })
    .transform(computedFields),
});

// Base plugins that are always used
const basePlugins: Pluggable[] = [
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behavior: "wrap",
      properties: {
        className: ["subheading-anchor"],
        ariaLabel: "Link to section",
      },
    },
  ],
];

// Add syntax highlighting based on environment
const rehypePlugins: Pluggable[] =
  process.env.NODE_ENV === "production"
    ? [...basePlugins, rehypeHighlight]
    : [
      ...basePlugins,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          keepBackground: true,
          onVisitLine(node: any) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
        },
      ],
    ];

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [...rehypePlugins, rehypeMermaid],
    remarkPlugins: [],
  },
});
