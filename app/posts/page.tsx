import { posts } from "#site/content";
import Container from "@/components/container";
import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CMS_AUTHOR, META_POSTS } from "@/lib/constants";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Posts ${CMS_AUTHOR}`,
  description: META_POSTS,
};

const POSTS_PER_PAGE = 6;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(await searchParams?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage,
  );

  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <Container>
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Posts</h1>
          <p className="text-xl text-muted-foreground">A list of posts, I hope you find helpful.</p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12">
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {sortedTags?.map((tag) => <Tag tag={tag} key={tag} count={tags[tag]} />)}
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 col-start-1">
          {displayPosts?.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 col-span-12 gap-4 mb-32">
              {displayPosts.map((post) => {
                const { slug, date, title, coverImage, excerpt, tags } = post;
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      date={date}
                      coverImage={coverImage}
                      title={title}
                      excerpt={excerpt}
                      tags={tags}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No posts 🥺</p>
          )}
          <QueryPagination totalPages={totalPages} className="justify-end mt-4" />
        </div>
      </div>
    </Container>
  );
}
