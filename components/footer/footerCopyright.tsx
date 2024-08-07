import { GOOGLE_FONTS_URL } from "@/lib/constants";

const FooterCopyright = () => {
  return (
    <div className="w-full pt-10 text-left md:pt-0 md:w-1/2">
      <h3 className="pb-3 text-2xl font-medium">Thank you for visiting 🤘</h3>
      <ul className="leading-8 footer-copyright">
        <li>Hosted on Vercel built with Next.js.</li>
        <li>
          Fonts:{" "}
          <a
            href={GOOGLE_FONTS_URL}
            rel="noopener noreferrer"
            target="_blank"
            className="underline"
          >
            Ubuntu.
          </a>
        </li>
        <li>
          Icons:{" "}
          <a
            href="https://fontawesome.com"
            rel="noopener noreferrer"
            target="_blank"
            className="underline"
          >
            Font Awesome 5.
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FooterCopyright;
