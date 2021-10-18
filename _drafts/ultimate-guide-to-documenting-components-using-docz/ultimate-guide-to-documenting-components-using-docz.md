---
title: 'ultimate-guide-to-documenting-components-using-docz'
excerpt: ''
coverImage: 'https://res.cloudinary.com/mannuel/image/upload/v1623933965/images/git-article.png'
date: '2021-10-17T06:45:00.322Z'
author:
  name: 'M Ferreira'
  picture: 'https://res.cloudinary.com/mannuel/image/upload/v1604067445/images/mee.jpg'
ogImage:
  url: 'https://res.cloudinary.com/mannuel/image/upload/v1623933965/images/git-article.png'
---

## What is docz?

Writing documentation is often pushed to the end of the backlog. I'm a busy developer I have to ship that new money making feature ASAP, first to market wins as they say. Sadly documenting features is often left as an after thought or never done at all.

Setting up a separate documentation site is laborious. I once spent a couple days at work building a static documentation site for our front end. It was a pain we had to create a new repository for it, setup the build tools, set up the deployment pipeline. We were using kubernetes which complicated the matter further.

docz is a static site builder that helps you build documentation site along side your existing front end in the same repo, in the same folder.

docz is your new best friend. I recently added docz to a side project, I have to say the experience was painless and rather fun. docz is an open source documentation site builder designed with simplicity at its core.

All the complications of setting up build tools to develop, run and deploy a static website have a been abstracted away into three simple npm commands.

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
