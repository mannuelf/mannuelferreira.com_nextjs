import { CMS_NAME } from '@shared/constants';

const FooterCopyright = () => {
  return (
    <div className='w-full pt-10 text-left md:pt-0 md:w-1/2'>
      <h3 className='pb-3 text-2xl font-medium'>Thank you for visiting</h3>
      <ul className='footer-copyright leading-8'>
        <li>
          Made with <i className='far fa-heart'></i> by {CMS_NAME}. Hosted on[Vercel with Next.js.
        </li>
        <li>
          Fonts:{' '}
          <a
            href='https://fonts.google.com/share?selection.family=Fira%20Sans:wght@400;500%7CUbuntu:wght@400;500;700'
            rel='noopener noreferrer'
            target='_blank'
            className='underline'
          >
            Ubuntu, Fira.
          </a>
        </li>
        <li>
          Icons:{' '}
          <a
            href='https://fontawesome.com'
            rel='noopener noreferrer'
            target='_blank'
            className='underline'
          >
            Font Awesome 5.
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FooterCopyright;
