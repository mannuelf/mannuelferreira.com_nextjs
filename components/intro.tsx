const Intro = () => {
  return (
    <section className='flex flex-col md:flex-col md:justify-between mb-16 md:mb-12 max-w-screen-md'>
      <h1 className='text-5xl font-bold leading-13 pb-5'>Hello world.</h1>
      <p className='text-2xl leading-10'>
        I&apos;m a Nordic developer working for{' '}
        <a href='https://sats.no' target="_blank" rel="noopener noreferrer">
          SATS{' '}
          <i className='fa fa-external-link-alt text-sm'></i>
        </a>.
        Previously taught Frontend development at{' '}
        <a
          href='https://www.noroff.no/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Noroff Fagskole <i className='fa fa-external-link-alt text-sm'></i>
        </a>
        , before that I helped build and maintain{' '}
        <a
          href='https://superbalist.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Superbalist.com <i className='fa fa-external-link-alt text-sm'></i>
        </a>{' '}
        a fashion retailer in Cape Town <abbr title="South Africa">SA</abbr>.
      </p>
      <p>
        Designing, building web applications and websites is my favourite
        thing. Currently my tech interests are JavaScript, TypeScript, React,
        GraphQL (client and servers), Node.js<sup>®</sup>.
      </p>
      <p>
        I&apos;ve also written in Vue.js, PHP, Laravel, python. I am experienced
        with Docker, Kubernetes, Linux, AWS, Google Cloud, Heroku, Netlify &amp;
        Vercel.
      </p>
    </section>
  );
};

export default Intro;
