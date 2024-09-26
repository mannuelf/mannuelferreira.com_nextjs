"use client";

import { pageView } from "@/lib/gtagHelper";
import LogRocket from "logrocket";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { Suspense, useEffect } from "react";

function GoogleAnalyticsComponent({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathName}${searchParams.toString()}`;
    pageView(GA_MEASUREMENT_ID, url);
    LogRocket.init("8bbcyq/mannueferreiracom");
  }, [pathName, searchParams, GA_MEASUREMENT_ID]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('consent', 'default', {
                    'analytics_storage': 'denied'
                });

                gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                });
                `,
        }}
      />
    </>
  );
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleAnalyticsComponent GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
    </Suspense>
  );
}
