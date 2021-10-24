---
title: 'Ultimate guide to documenting components using docz'
excerpt: ''
coverImage: 'https://res.cloudinary.com/mannuel/image/upload/v1623933965/images/git-article.png'
date: '2021-10-17T06:45:00.322Z'
author:
  name: 'M Ferreira'
  picture: 'https://res.cloudinary.com/mannuel/image/upload/v1604067445/images/mee.jpg'
ogImage:
  url: 'https://res.cloudinary.com/mannuel/image/upload/v1623933965/images/git-article.png'
---

I often push writing documentation to the end of my development cycle. It may be the last thing I do once I have finished building a feature. Things I may document include how to get started, properties of the components and api endpoints. 

Waiting to the end of development is not ideal because at times with best intentions I might never get round to actually completing the documentation process. I mean I wrote such good code in the first place that it's self documenting amiright! 🤪🤣. Let's talk about Docz the solution to all my documentation problems.

## What is docz?

What if I said you could build your React documentation at exactly the same time as you build that feature. And have the documentation site live update in real time as you add new props to that React component, sounds amazing right. This is Docz and this is where Docz shines.

![docz](/assets/blog/ultimate-guide-to-documenting-components-using-docz/docz-site.png)

[Docz](https://www.docz.site) is an Open Source, zero config, easy to customize static site generator with the goal of removing the pains of creating documentation websites in your team or side project.

## How does it work?

Leveraging the power of Gatsby, docz builds a mobile first, SEO friendly static website along-side your projects.

- You write a markdown file
- point to a react component
- the react component should have comments in the interface and type declarations as seen below
- docz renders an HTML page for it in a separate website.

/client/src/components/common/Button.tsx
```tsx
import React from 'react';

interface ButtonProps {
  /*
   * Align the button: left | right
   */
  btnAlign?: string | null;
  /*
   * Background colour: orange | #FF9900
   */
  btnBgColor?: string;
  /*
   * Padding customisation: 0 | 10
   */
  btnPadding?: string;
  /*
   * Round or square button: 0 | 10
   */
  btnRadius?: string;
  /*
   * Customise button width: 100px | 0.5rem
   */
  btnWidth?: string
  /*
   * Shadow: true | false
   */
  btnBoxShadow?: boolean;
  /*
   * ClassName customisation: string | null
   */
  className?: string;
  /*
   * Disabled: true | false | null
   */
  disabled?: boolean;
  /*
   * Type: button | submit | reset
   */
  type?: string;
  /*
   * Name: Submit | Reset
   */
  name?: string;
  /*
   * Text | React Component
   */
  children?: React.ReactNode | React.ReactNode[];
  /*
   * Click: Function
   */
  onClick?: () => void;
};


const Button = styled.button<ButtonProps>`
  /* removed for brevity, check the GitHub repo */
`;

export default Button;
````
[view on GitHub](https://github.com/mannuelf/react-drums/blob/main/client/src/components/common/Button.tsx#L4)

Docz renders components live with MDX and has TypeScript support, to mention two of my favourite features. 

I wont go into too much depth here as there are great articles about this written by [Mohmed](https://aviyel.com/post/1161/this-free-tool-lets-you-create-world-class-documentation-for-react-components) and [Hillary](https://aviyel.com/post/1178/the-do-s-and-don-ts-of-front-end-documentation).


Instead I will guide you through how I integrated docz into my side project [Machine](https://react-drum-machine.netlify.app) a drum machine built with React.

![Machine](/assets/blog/ultimate-guide-to-documenting-components-using-docz/machine.png)

I've always wanted to build a site to document my React components but I always thought I didn't have enough time... enter docz.

## What do i want to document? 

As a developer working in a team I want to show and tell my colleagues how to: 

### Project overview

- setup the project
- configure the project
- update the project
- deploy the project etc.

### Component overview

- what props the component has
- describe the interface of the component
- describe any usage anti-patterns for the given component

## Installing docz in a monorepo

### Setting the scene

I have a monorepo with a React client (SPA) and an Apollo GraphQL backend. All is driven by Yarn workspaces.

#### Project structure

/root/
```bash
📁 client
📁 server
   package.json
   ...
```

### Decisions

#### Option A

First decision I needed to make was do I want integrate docz within my existing client folder. 

This possible with docz, docz will find all mdx files existing in the project and render a website from this. This would allow me to follow React feature based architecture pattern by having the component, the mdx file, the unit test all in one folder, like this:

```bash
📁 client
     feature
       Machine
         Machine.mdx
         Machine.tsx
         Machine.spec.ts
  ...
```

#### Option B

I could choose to create a separate folder call it and have a standalone website which I tell Yarn Workspaces about.

/root/
```bash
📁 client
📁 documentation
     Button.mdx
     Input.mdx
     Machine.mdx
     doczrc.js
     gatsby-config.js
     package.json
📁 server
   package.json
   ...
```
[view on GitHub](https://github.com/mannuelf/react-drums)

Option B is the what I went with. I like the separation of concerns, this is matter of personal taste you go with what you like. It also made it easier to deploy in the monorepo context on Netlify.

## Installation

/root/
```bash
mkdir documentation
cd documentation
```

create package.json with Yarn

/documentation/
```bash
yarn init -y
```

Install docz and react and react-dom both @ version 16.8.0 as per the docz docs. I also included rimraf so I can delete the compiled .docz build directly from time to time.

/documentation/
```bash
yarn add docz react@16.8.0 react-dom@16.8.0 rimraf
```

### Configurations

### package.json

- I set docz to run on port 3002 and 3003 as the React client is already using port 3000
- you may notice I have also installed [@nejcm/docz-theme-extended](https://github.com/nejcm/docz-theme-extended), its great do this.

/documentation/package.json
```json
{
  ...
  "scripts": {
    "docz:build": "docz build",
    "docz:dev": " docz dev --port=3002",
    "docz:serve": "docz build && docz serve --port=3003",
    "docz:clean": "rimraf .docz"
  },
  "dependencies": {
    "docz": "^2.3.1",
    "react": "16.8.0",
    "react-dom": "16.8.0",
    "rimraf": "^3.0.2",
    "@nejcm/docz-theme-extended": "^2.0.14",
  }
}
```

As I have monorepo, I created scripts to run docz from the ROOT directory of the entire project. 

I made one script to correspond to each script in docz folder. I am use `concurrently` to run all scripts at the same time to have all services running at the same time. 

/root/package.json
```json
...
"scripts": {
    "dev": "concurrently \"yarn dev:server\"   \"yarn dev:client\"  \"yarn studio\" \"yarn docz:dev\" ",
    "docz:build": "yarn --cwd documentation docz:build",
    "docz:clean": "yarn --cwd documentation docz:clean",
    "docz:dev": "yarn --cwd documentation docz:dev",
    "docz:serve": "yarn --cwd documentation docz:serve",
  }
...
```

In the root of `documentation` folder create a doczrc.js configuration file.

- enable typescript features

/documentation/doczrc.js
```js
export default {
  typescript: true,
};
```

### Theme update

- customize theme, set to dark mode by default, add dark and light logo
- configure the side menu with Groups and sube nav items

/documentation/doczrc.js
```js
export default {
  typescript: true,
  themeConfig: {
    mode: 'dark',
    logo: {
      src: {
        light: 'path/to/logo'
        dark: 'path/to/logo'
      },
      width: 260,
    },
    menu: {
      search: false,
      headings: {
        rightSide: true,
        scrollspy: true,
        depth: 3,
      },
    },
  },
  menuDisplayName: {},
  groups: { /* insert nav groups, these are the neat headings above the nav groups */},
  menu: [ /* create your nav structure here, see link below*/ ],
}
```

For brevity I have emptied some of the objects, you can see a completed version [here](https://github.com/mannuelf/react-drums/blob/main/documentation/doczrc.js) on GitHub.

I wanted to extend the default style of the frontend and I found a really neat project docz-theme-extended.

Install [@nejcm docz-theme-extended](https://github.com/nejcm/docz-theme-extended) and configure the gatsby config like this:

/documentation/
```bash
yarn add @nejcm/docz-theme-extended
```

create a gatsby config file

/documentation/gatsby-config.js
```bash
module.exports = {
  plugins: [
    {
      resolve: '@nejcm/docz-theme-extended',
    },
  ],
};
```

With all the above correctly configured I have this to show for it:

![docz](/assets/blog/ultimate-guide-to-documenting-components-using-docz/machine-docz.png)

### Document first component

Recall that we have a monorepo, with 3 folders 

- client
- documentation 
- server

Docz shines here, as we can now reach into any of these folders and bring React components into it's context for documentation.

### Button.mdx

MDX is awesome, having a live component in a webpage that you can update the props and see the changes reflect immediately is just magic , I love it. 

Notice in the MDX file below I have meta data, 

- name (name of component)
- route (builds the path in address bar)
- parent (tel docz under which group to place the nav item)
- menu (tel docs under which drop-down nav to place the menu item)

Notice my imports, I am importing `Playground`, `Props`. Secondly I am reaching into the client folder and including my button component into the documentation site.🚀. 

Now any changes I make to the client will be reflected immediately in the documentation website.

/documentation/Button.mdx

```js
---
name: Button
route: /client/button
parent: Frontend
menu: Components
---

import { Playground, Props } from 'docz';
import Button from '../client/src/components/common/Button';

# Button

A Generic Button uses styled-components API to change the appearance of it.

The styling of components are done with [styled-components](https://styled-components.com).

## Usage

'''tsx
import Button from 'components/common/Button';
'''

<Props of={Button}/>

<Playground>
  <Button
    btnAlign='center'
    btnBgColor='orange'
    btnPadding='0.6'
    btnRadius='4'
    btnWidth='200'
    btnBoxShadow={true}
    className='some-class-here'
    disabled={false}
    onClick={() => console.log('Button was clicked')}
  >
    Signup
  </Button>

  <Button>
    Signup
  </Button>
</Playground>
```

## Deploying to Netlify

I have 3 services in this monorepo now, the Machine (client), the documentation website, both are deployed to Netlify and the server to Heroku.

### Configure Netlify

Configure Netlify deployment context to point to the documentation folder and run the correct build command.

![netlify](/assets/blog/ultimate-guide-to-documenting-components-using-docz/netlify.png)

Run the build command to create a production build of docz. Docz will create a `.docz` and in my case place a `public` folder inside which is what users will see.  

/root/
```bash
yarn docz:build
```

I highly recommend that you use the [Netlify CLI](https://docs.netlify.com/cli/get-started/) so you can test you production builds locally. 


### Docz site deployed

[www.react-drum-docz.netlify.app](https://react-drum-docz.netlify.app/)

## Conclusion and Who made it with links to repo

This one issue I had was React version mismatch, client was already running on react@17.01 and being a Yarn monorepo the documentation site running on react@16.8.0 was causing issues, so i had to lower the version of react on the client.

The team at docz have done an amazing job of simplifying the process of building a documentaion site. All the Gatsby complexity has been abstracted away and exposed four commands to build and deploy your site.

```bash
yarn docs:dev
yarn docz:build
yarn docz:serve
```

I urge you to try it out standalone first I guarentee you will have a great developer experience.
