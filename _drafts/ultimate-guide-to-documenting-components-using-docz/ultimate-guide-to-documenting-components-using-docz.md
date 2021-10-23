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

I often push writing documentation to the end of my development cycle. It may be the last thing I do once I have finished building a feature. I may document how to get started, properties of the components or api integration docs. This is not ideal because at times with best intentions I might never get round to actually completing the documentation process. I mean I wrote such good code it1s self documenting right? Kidding myslef. 

## What is docz?

What if I said you could build your documentation at exactly the same time as you build that feature. And have the documentation site live update in real time as you add new props to that React component, sounds amazing right. This is where Docz shines.

![docz](/assets/blog/ultimate-guide-to-documenting-components-using-docz/docz-site.png)

[Docz](https://www.docz.site) is an Open Source, zero config, easy to customize static site generator with the goal of removing the pains of creating documentation websites in your team or side project.

## How does it work?

Leveraging the power of Gatsby, docz builds a mobile first, SEO friendly static website along-side your projects. 

- You write a markdown file
- docz renders an HTML page for it

It renders components live with MDX and has TypeScript support, to mention two of my favourite features. I wont go into too much depth here as there are great articles about this written by [Mohmed](https://aviyel.com/post/1161/this-free-tool-lets-you-create-world-class-documentation-for-react-components) and [Hillary](https://aviyel.com/post/1178/the-do-s-and-don-ts-of-front-end-documentation).


Instead I will guide you through how I integrated docz into my side project [Machine](https://react-drum-machine.netlify.app) a drum machine built with React. 

![Machine](/assets/blog/ultimate-guide-to-documenting-components-using-docz/machine.png)

I've always wanted to build a site to document my React components but I always thought I didn't have enough time... enter docz.


## Installing docz in a monorepo

### Setting the scene

I have a monorepo with a React frontend (SPA) and an Apollo GraphQL backend. All is driven by Yarn workspaces.

#### Project structure

```bash
📁 client
📁 server
   package.json
   ...
```

### Decisions option A or B

#### Option A

First decision I needed to make was do I want integrate docz within my existing frontend folder. This possible with docz, then I could follow React feature based architecture pattern by having the component, mdx file, unit test all in one folder, like this:

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

I could choose to create a separate folder call it `documentation`, `docs`, `docz` and have a standalone website which I tell Yarn Workspaces about.

This is the option I went with, I like the separation of concerns, this is matter pf personal taste you go with what you like.


```bash
📁 client
📁 documentation
     Machine.mdx
     doczrc.js
     package.json
📁 server
   package.json
   ...
```


## Installation


```bash
mkdir documentation
cd documentation
```

create package.json with Yarn

```bash
yarn init -y
```

Install docz and react and react-dom both @ version 16.8.0 as per the docz docs. I also included rimraf so I can delete the compiled .docz build directly from time to time. 

```bash
yarn add docz react@16.8.0 react-dom@16.8.0 rimraf
```

### Configurations

### package.json 

- set docz to run on port 3002 and 3003 as the React client is already using port 3000
- you may notice I have also installed [@nejcm/docz-theme-extended](https://github.com/nejcm/docz-theme-extende), its great do this.

```json
{
  ...
  "private": true,
  "scripts": {
    "docz:build": "docz build",
    "docz:dev": " docz dev --port=3002",
    "docz:serve": "docz build && docz serve --port=3003",
    "docz:clean": "rimraf .docz"
  },
  "dependencies": {
    "@nejcm/docz-theme-extended": "^2.0.14",
    "docz": "^2.3.1",
    "react": "16.8.0",
    "react-dom": "16.8.0",
    "rimraf": "^3.0.2"
  }
}
```

In the root of `documentation` folder create a doczrc.js configuration file.

- enable typescript features

```js
export default {
  typescript: true,
}
```

- customize theme, set to dark mode by default, add dark and light logo
- configure the side menu with Groups and sube nav items

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

For brevity I have emptied some of the objects, you can see a complete version [here](https://github.com/mannuelf/react-drums/blob/main/documentation/doczrc.js)

```bash
yarn docz:dev
```

```bash
yarn docz:build
```

and

```bash
yarn docz:serve
```

## How does Docz work?

I have come to love writing in markdown, docz is using markdown and markdown

## Installing Docz in monorepo

### Configurations minimal

If you want to re-order your navigation simply create a `docz.config.js` file in the root of the docz folder.

```javascript
module.exports = {
  menu: ['Home', 'Client', 'Components', 'Server'],
};
```

## Using it as standalone documentation site/project in monorepo

## Using Docz to document existing React project components

## Using Docz to document API endpoints

## Deploying docz to Netlify

## Findings and opinions

Sometimes during development you may have entered in incorrect path into your mdx file. You are forced to stop and start the docz server. You may notice the fixed path not showing because the builder has not created the new build. the .docz folder is heavily cached and you wont see your changes pulling through. It's helpfull to have `clean up` command to delete the the old build.

```bash
yarn docz:clean
```

Port number not changeable, if running react-create-app change that to 3001

## Conclusion and Who made it with links to repo

- [docz.site](https://docz.site)

### References

- [docz.site](https://docz.site)
- [docz.site](https://docz.site)
