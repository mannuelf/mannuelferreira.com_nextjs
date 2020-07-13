import React from 'react';
import HomePanel from '../../redux/reducers/home';

const Home: any = () => {
  return (
    <section className="app-row p-10 bg-gray-200 md:pr-6 md:pl-6">
      <div className="container mx-auto w-full sm:w-1/1 md:w-1/1 lg:w-1/2 xl:w-1/2">
        <h1 className="text-4xl leading-10 pb-5">
          Hi, my name is {HomePanel.name}
        </h1>
        <p>
          I'm a {HomePanel.occupation}. I teach Front End development at{' '}
          <a
            href="https://www.noroff.no/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Noroff Fagskole <i className="fa fa-external-link-alt text-sm"></i>
          </a>
          , previously I'd spent my days and some times evenings helping build
          and maintain a fashion e-commerce store in South Africa{' '}
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
          I enjoy building and designing applications for the web. I love
          working with web technology {HomePanel.tools}. I enjoy learning and
          teaching web development and engineering concepts.
        </p>
        <p>
          If I go outside you might find me playing football, squash or eating
          something delicious in a random restaurant.
        </p>
      </div>
    </section>
  );
};

export default Home;
