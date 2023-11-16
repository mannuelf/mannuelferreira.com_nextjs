---
published: true
title: "Typesense an open-source alternative to Algolia and Elasticsearch"
excerpt: "Building a custom search into your application can be a deeply technical and expensive endeavor in terms of build hours and license fees. Typesense is aiming to fix those pains with it’s Open-Sourced solution to web search Typesense."
category: "Tools"
tags: "Search"
coverImage: "https://www.mannuelferreira.com/assets/blog/typesense-open-source-alternative-to-algolia-and-elasticsearch/typesense-header.png"
date: "2021-10-21T22:05:00.322Z"
author:
  name: "M Ferreira"
  picture: "https://res.cloudinary.com/mannuel/image/upload/f_auto/v1604067445/images/mee.jpg"
ogImage:
  url: "https://www.mannuelferreira.com/assets/blog/typesense-open-source-alternative-to-algolia-and-elasticsearch/typesense-header.png"
---

## What is it

Typesense an open-source alternative to Algolia and Elasticsearch.

![typsense](/assets/blog/typesense-open-source-alternative-to-algolia-and-elasticsearch/typesense-header.png)

## TLDR

> Show me the code [Click here](https://github.com/mannuelf/typesense-algolia-search-comparison/tree/main/typesense-client)

Otherwise keep reading.

One key feature of any website or web application is the ability to search the data or content within the system. A fast and accurate search experience can improve user experience for you customers.

Building a custom search into your application can be a deeply technical and expensive endeavor in terms of hours and subscription fees. Typesense is aiming to fix those pains with it’s Open-Sourced solution to web search Typesense.

Typesense is a fast typo tolerant search engine boasting a sub-50ms search that feels instant. Typesense is built in C++, it is free to use and deploy on self hosted projects.

## A few notable features include

### Typo tolerance

Typesense will automatically try to correct your typos. Typo tolerance is configurable on a per field basis.

### Multi-tenant API Keys

Security through API keys, which allows you to restrict access to specific sets of data, not all apps need to have access to all your data.

### Geo search

Filter data using geolocation data to retrieve data within a given radius.

### Federated search

Users are able to search across multiple data sets (collections) in one HTTP request.

Other features include synonyms, tunable ranking, result pinning, filtering and faceting, dynamic sorting, easy high availability and easy version upgrades.

### Client Libraries

Setting up a search experience in your web application is now trivial thanks to the official client libraries available in Ruby, Python, PHP and my personal favorite JavaScript. There are community driven libraries available for GO, C#, Laravel and Symphony. These HTTP libraries allow you to interact with Typesense servers with minimal friction and best practices baked in.

### UI component libraries

If that wasn’t cool enough to further smooth the road, Typesense has UI Component adapters to help you build your UI. The Typesense Instant Search Adapter is based on Algolia open-sourced instantsearch.js. If you have experience with Algolias adapter it makes the switch to Typesense all that much smoother.

### The adapter comes in 4 flavours

- Instantsearch.js
- react-instantsearch
- vue-instantsearch
- angular-instantsearch

## Demonstration

This demo should run on your localhost only. Have fun 🚀

### Typesense React Client

> Fork it [Click here](https://github.com/mannuelf/typesense-algolia-search-comparison/tree/main/typesense-client)

What you will see:

![typsense](/assets/blog/typesense-open-source-alternative-to-algolia-and-elasticsearch/demosite.png)

> ✨ Bootstrapped with [Create Snowpack App (CSA)](https://www.snowpack.dev).

### Prerequisites

- [Node.js](https://nodejs.org) using npm or [yarn](https://yarnpkg.com)
- [Docker](https://www.docker.com/get-started)

Use Docker for MAC/Windows etc it's the simplest for this code demo.

### Available Scripts

Run the following scripts in multiple tabs in the order they appear here:

```bash
yarn
```

Yarn, to install all dependencies.

```bash
yarn typesenseServer
```

Pulls down a Typesense Docker image (v0.22.0.rcu6), sets a local data directory, maps it to the container and starts the container. Container is running on port 8180.

```bash
yarn indexer
```

Indexes the demo e-commerce data into Typesense. Thanks to [@jasonbosco](https://github.com/jasonbosco) for this.

> 🚨 Note: environment variables are dangerously set to `process.env.SNOWPACK_PUBLIC_` and should not be deployed to production servers in this demonstration state.

```bash
SNOWPACK_PUBLIC_TYPESENSE_HOST=localhost
SNOWPACK_PUBLIC_TYPESENSE_PORT=8108
SNOWPACK_PUBLIC_TYPESENSE_PROTOCOL=http
SNOWPACK_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY=xyz
SNOWPACK_PUBLIC_TYPESENSE_ADMIN_API_KEY=xyz
```

```bash
yarn start
```

Runs the app in the development mode.
Open [http://localhost:8080](http://localhost:8080s) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### Snowpack.dev

```bash
yarn build
```

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like [@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-webpack) or [snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle) to your `snowpack.config.mjs` config file.

What about EJECT? No eject needed! Snowpack guarantees zero lock-in, and CSA strives for the same.

### Links

- [typesense.org](https://typesense.org/)
- [hub.docker.com/r/typesense](https://hub.docker.com/r/typesense/typesense/tags?page=1&ordering=last_updated)
- [producthunt.com/posts/typesense](https://www.producthunt.com/posts/typesense)

### References

- [typesense.org/docs](https://typesense.org/docs/)
