import React from "react";
import { Link } from "react-router-dom";
import HomePanel from "../../redux/reducers/home";

const About: any = () => {
  return (
    <section className="app-row p-10 bg-gray-200 md:pr-6 md:pl-6">
      <div className="container mx-auto">
        <h1 className="text-4xl leading-10 pb-5">
          Hi, my name is {HomePanel.name}
        </h1>
        <p className="big">
          <Link to="/about">Read more about me</Link>
        </p>
        <p>
          I'm a {HomePanel.occupation}. I teach Front End development at{" "}
          <a
            href="https://www.noroff.no/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Noroff Fagskole
          </a>{" "}
          in Norway. Previously I worked for{" "}
          <a
            href="https://superbalist.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Superbalist.com
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
        <p>
          I recently launched a site called{" "}
          <a
            href="https://www.whatcoinwhichcoin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            WHATcoin WHICHcoin
          </a>
          . It's a work in progress, you can view the latest bitcoin and
          etherium price there.
        </p>
      </div>
    </section>
  );
};

export default About;
