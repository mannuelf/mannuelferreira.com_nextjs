import Container from "@/components/container";
import { CONSENT_META } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consent",
  description: CONSENT_META,
};

export default async function ConsentPage(): Promise<React.ReactElement> {
  return (
    <Container>
      <section className="flex items-start gap-4 md:justify-between md:gap-8">
        <div className="flex-1 space-x-4">
          <h1 className="inline-block text-4xl font-black lg:text-5xl">Consent</h1>
        </div>
      </section>

      <hr className="my-8" />

      <section className="flex flex-col gap-2">
        <h1 className="font-bold mb-2">Cookie Policy for mannuelferreira.com Website</h1>
        <p className="mb-2">Effective Date: [Insert Date]</p>
        <h2 className="font-bold mb-2">1. Introduction</h2>
        <p className="mb-2">
          Welcome to Mannuel Ferreira’s website (https://mannuelferreira.com/). This Cookie Policy
          explains how we use cookies and similar technologies to recognize you when you visit our
          website. It explains what these technologies are and why we use them, as well as your
          rights to control our use of them.
        </p>

        <h2 className="font-bold mb-2">2. What are cookies?</h2>
        <p className="mb-2">
          Cookies are small data files that are placed on your computer or mobile device when you
          visit a website. Cookies are widely used by website owners to make their websites work, or
          to work more efficiently, as well as to provide reporting information.
        </p>

        <h2 className="font-bold mb-2">3. How do we use cookies?</h2>
        <p className="mb-2">
          We use cookies to track and analyze website traffic using Google Analytics. This helps us
          understand how visitors interact with our website, which allows us to improve the user
          experience.
        </p>

        <h2 className="font-bold mb-2">4. What types of cookies do we use?</h2>
        <p className="mb-2">
          <strong>Essential Cookies:</strong> These cookies are necessary for the website to
          function and cannot be switched off in our systems. They are usually only set in response
          to actions made by you which amount to a request for services, such as setting your
          privacy preferences, logging in, or filling in forms.
        </p>
        <p className="mb-2">
          <strong>Analytics Cookies:</strong> These cookies collect information that is used either
          in aggregate form to help us understand how our website is being used or how effective our
          marketing campaigns are, or to help us customize our website for you.
        </p>

        <h2 className="font-bold mb-2">5. Your choices regarding cookies</h2>
        <p className="mb-2">
          You have the right to decide whether to accept or reject cookies. You can exercise your
          cookie preferences by setting or amending your web browser controls to accept or refuse
          cookies. If you choose to reject cookies, you may still use our website though your access
          to some functionality and areas of our website may be restricted.
        </p>

        <h2 className="font-bold mb-2">6. Changes to this Cookie Policy</h2>
        <p className="mb-2">
          We may update this Cookie Policy from time to time in order to reflect, for example,
          changes to the cookies we use or for other operational, legal, or regulatory reasons.
          Please re-visit this Cookie Policy regularly to stay informed about our use of cookies and
          related technologies.
        </p>

        <h2 className="font-bold mb-2">7. Contact us</h2>
        <p className="mb-2">
          If you have any questions about our use of cookies or other technologies, please email me
          hello@mannuelferreira.com
        </p>
      </section>
    </Container>
  );
}
