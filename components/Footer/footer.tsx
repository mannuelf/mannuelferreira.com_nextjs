import FooterSocial from './footerSocial';
import FooterCopyright from './footerCopyright';
import Container from '@components/container';

const Footer = () => {
  return (
    <footer className='app-footer pt-10 pb-10'>
      <Container>
        <div className='flex flex-wrap justify-start -mx-2'>
          <FooterCopyright />
          <FooterSocial />
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
