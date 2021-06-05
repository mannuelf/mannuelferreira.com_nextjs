const Intro = ({ author }) => {
  return (
    <section className="flex-col md:flex-col flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-4xl leading-10 pb-5">
        Hi, my name is Mannuel Ferreira
      </h1>
      <p>
        I'm a Software Engineer, I teach Front End development at{' '}
        <a
          href="https://www.noroff.no/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Noroff Fagskole <i className="fa fa-external-link-alt text-sm"></i>
        </a>
        , previously I'd spent my days and some times evenings helping build and
        maintain a fashion e-commerce store in South Africa{' '}
        <a
          href="https://superbalist.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Superbalist.com <i className="fa fa-external-link-alt text-sm"></i>
        </a>
        .
      </p>
      <p>
        I enjoy building and designing applications for the web. I love working
        with web technology JavaScript, TypeScript, React, Vue Js, PHP, python,
        Sass, Docker, Kubernetes, Minikube, Linux, Mac OSX, CENTOS, UBUNTU, AWS,
        Google Cloud, Heroku, Netlify, Next.js. I enjoy learning, teaching web
        development and engineering concepts.
      </p>
    </section>
  );
};

export default Intro;
