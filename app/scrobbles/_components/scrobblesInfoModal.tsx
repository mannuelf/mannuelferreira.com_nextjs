"use client";

import {
  URL_COVER_ART_ARCHIVE,
  URL_FANARTTV,
  URL_LASTFM_NPM_PKG,
  URL_TWITTER_PROFILE,
} from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { Info, X } from "lucide-react";
import { useState } from "react";

type Props = {
  playcount: string;
};

export default function ScrobblesInfoModal({ playcount }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
        aria-label="About this page"
      >
        <Info size={22} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-lg bg-popover border border-border rounded-2xl p-8"
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.97 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
                  <p className="text-base text-foreground">
                    My love for collecting music has brought me to keep using lastFm. I have been
                    tracking my listening habits with lastFm since 2008. I have always wanted to
                    play with the data, that is what this page is about. I of course want to share
                    what I have been listening to with you all.
                  </p>
                  <p>
                    Total plays:{" "}
                    <span className="text-3xl font-bold text-red-500">{playcount}</span>
                  </p>
                  <p>
                    I built an API wrapper to the lastFM API in TypeScript.{" "}
                    <a
                      href={URL_LASTFM_NPM_PKG}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-foreground"
                    >
                      Get the package here.
                    </a>
                  </p>
                  <p>
                    Photos from{" "}
                    <a
                      href={URL_FANARTTV}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-foreground"
                    >
                      fanart.tv
                    </a>{" "}
                    and{" "}
                    <a
                      href={URL_COVER_ART_ARCHIVE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-foreground"
                    >
                      Musicbrainz Cover Art Archive
                    </a>
                    . If you know of another API{" "}
                    <a
                      href={URL_TWITTER_PROFILE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-foreground"
                    >
                      let me know
                    </a>
                    . 🤙
                  </p>
                  <p>
                    Source code on{" "}
                    <a
                      href="https://github.com/mannuelf/mannuelferreira.com_nextjs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-foreground"
                    >
                      GitHub
                    </a>
                    .
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
