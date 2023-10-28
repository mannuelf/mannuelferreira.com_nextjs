import Footer from "../Footer/footer";
import Header from "../header";
import Meta from "../meta";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <Header />
      <main className="mt-16">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
