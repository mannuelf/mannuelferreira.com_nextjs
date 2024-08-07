"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo
          className="h-6 w-6"
          title={siteConfig.name}
          alt={siteConfig.name}
          srcLight="light"
        />
        <span className="hidden">{siteConfig.name}</span>
      </Link>
      <Link
        href="/posts"
        className={cn(
          "text-normal text-black font-bold transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/posts" ? "text-foreground" : "text-foreground/60",
        )}
      >
        Posts
      </Link>
      <Link
        href="/about"
        className={cn(
          "text-normal text-black font-bold transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/about" ? "text-foreground" : "text-foreground/60",
        )}
      >
        About
      </Link>
    </nav>
  );
}
