"use client";

import { getLocalStorage, setLocalStorage } from "@/lib/storageHelper";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);
    setCookieConsent(storedCookieConsent);
  }, [setCookieConsent]);

  useEffect(() => {
    if (typeof window.gtag === "function") {
      const newValue = cookieConsent ? "granted" : "denied";

      window.gtag("consent", "update", {
        analytics_storage: newValue,
      });

      setLocalStorage("cookie_consent", cookieConsent);
    }
  }, [cookieConsent]);

  if (cookieConsent !== null) {
    return null;
  }

  return (
    <>
      <div
        className={
          "flex bg-emerald-700 text-white dark:text-white my-10 mx-auto max-w-max md:max-w-screen-sm fixed bottom-0 left-0 right-0 px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4 rounded-lg shadow"
        }
      >
        <div className="text-center">
          <p>
            I use{" "}
            <Link href={"/consent"}>
              <strong>cookies</strong>
            </Link>{" "}
            to see what you like to read 🤓
          </p>
        </div>

        <div className="flex gap-2">
          <button
            className="px-5 py-2 rounded-md text-primary bg-secondary"
            onClick={() => setCookieConsent(false)}
          >
            No
          </button>
          <button
            className="px-5 py-2 rounded-lg bg-white text-black"
            onClick={() => setCookieConsent(true)}
          >
            Allow
          </button>
        </div>
      </div>
      ,
    </>
  );
}
