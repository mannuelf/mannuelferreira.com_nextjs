import FooterCopyright from "./footerCopyright";
import FooterSocial from "./footerSocial";

export default function Footer() {
  return (
    <footer className="pt-10 pb-10 bg-gray-200">
      <div className="flex flex-wrap justify-start mx-2">
        <FooterSocial />
        <FooterCopyright />
      </div>
    </footer>
  );
}
