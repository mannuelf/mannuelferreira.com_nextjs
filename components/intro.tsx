const Intro = () => {
  return (
    <section className='flex flex-col md:flex-col md:justify-between mt-16 mb-16 md:mb-12 max-w-screen-md'>
      <h1 className='text-5xl font-bold leading-13 pb-5'>
        Hello world, <br /> my name is Mannuel Ferreira
      </h1>
      <p className='text-2xl leading-10'>
        I&apos;m a Software Engineer, I teach Front End development at
        <a
          href='https://www.noroff.no/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Noroff Fagskole <i className='fa fa-external-link-alt text-sm'></i>
        </a>
        , previously I&apos;d spent my days building and maintaining{' '}
        <a
          href='https://superbalist.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Superbalist.com <i className='fa fa-external-link-alt text-sm'></i>
        </a>{' '}
        a fashion e-commerce store in South Africa.
      </p>
      <p>
        Designing and building web applications and websites is my favourite
        thing. These days my stack is JavaScript, TypeScript, React, GraphQL
        (client and servers), Node.js<sup>®</sup>.
      </p>
      <p>
        I&apos;ve also written websites and API&apos;s in Vue.js, PHP, Laravel,
        python. I am experienced with Docker, Kubernetes, Linux, AWS, Google
        Cloud, Heroku, Netlify &amp; Vercel.
      </p>
      <p>Looking ahead I am quite interested in React Native and DENO.</p>
    </section>
  );
};

export default Intro;
