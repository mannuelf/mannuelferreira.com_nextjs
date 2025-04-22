import { siteConfig } from "@/config/site";
import { CMS_NAME } from "@/lib/constants";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const ubuntuBold = fetch(new URL("../../../assets/fonts/Ubuntu-Bold.ttf", import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

export async function GET(req: NextRequest) {
  try {
    const fontBold = await ubuntuBold;

    const { searchParams } = req.nextUrl;
    const title = searchParams.get("title");

    if (!title) {
      return new Response("No title provided", { status: 500 });
    }

    const heading = title.length > 140 ? `${title.substring(0, 140)}...` : title;

    return new ImageResponse(
      (
        <div tw="flex relative flex-col p-12 w-full h-full items-start text-black bg-white">
          <div tw="flex items-center">
            <p tw="ml-2 font-bold text-2xl">{CMS_NAME}</p>
          </div>
          <div tw="flex flex-col flex-1 py-10">
            <div tw="flex text-xl uppercase font-bold tracking-tight font-normal">BLOG POST</div>
            <div tw="flex text-[80px] font-bold text-[50px]">{heading}</div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div tw="flex text-xl">{siteConfig.url}</div>
            <div tw="flex items-center text-xl">
              <div tw="flex ml-2">{siteConfig.links.github}</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Ubuntu",
            data: fontBold,
            style: "normal",
            weight: 700,
          },
        ],
      },
    );
  } catch (error) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
