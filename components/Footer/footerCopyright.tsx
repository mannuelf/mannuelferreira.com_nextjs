const FooterCopyright = () => {
  return (
    <div className="w-full sm:w-full md:w-full lg:flex-1 xl:flex-1 pb-10 text-left">
      <h3 className="text-2xl font-medium pb-3">Thank you for visiting</h3>
      <ul className="footer-copyright leading-8">
        <li className="border-b border-gray-600">
          Made with <i className="far fa-heart"></i> by Mannuel Ferreira.
        </li>
        <li className="border-b border-gray-600">
          Fonts:{' '}
          <a
            href="https://fonts.google.com/share?selection.family=Fira%20Sans:wght@400;500%7CUbuntu:wght@400;500;700"
            rel="noopener noreferrer"
            target="_blank"
            className="underline"
          >
            Ubuntu, Fira.
          </a>
        </li>
        <li className="border-b border-gray-600">
          Icons:{' '}
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
