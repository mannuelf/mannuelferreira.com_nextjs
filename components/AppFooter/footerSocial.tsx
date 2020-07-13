import React from "react";

const FooterSocial = () => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:1/3 xl:1/3 text-left sm:pl-0 md:pl-0 lg:pl-10">
      <h3 className="text-2xl pb-3">Follow me</h3>
      <ul className="flex">
        <li className="pr-4">
          <a
            href="https://github.com/mannuelf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-github text-3xl"></i>
          </a>
        </li>
        <li className="pr-4">
          <a
            href="https://codepen.io/mannuelf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-codepen text-3xl"></i>
          </a>
        </li>
        <li className="pr-4">
          <a
            href="https://twitter.com/manidf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-twitter text-3xl"></i>
          </a>
        </li>
        <li className="pr-4">
          <a
            href="https://www.linkedin.com/in/mannuelferreira/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-linkedin text-3xl"></i>
          </a>
        </li>
        <li className="pr-4">
          <a
            href="https://www.youtube.com/mannuelferreira"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-youtube text-3xl"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FooterSocial;
