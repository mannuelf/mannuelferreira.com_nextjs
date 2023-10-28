---
title: "Typesense and open-source alternative to Algolia and Elasticsearch"
excerpt: ""
coverImage: "https://res.cloudinary.com/mannuel/image/upload/f_auto/v1623933965/images/git-article.png"
date: "2021-06-22T06:45:00.322Z"
author:
  name: "M Ferreira"
  picture: "https://res.cloudinary.com/mannuel/image/upload/f_auto/v1604067445/images/mee.jpg"
ogImage:
  url: "https://res.cloudinary.com/mannuel/image/upload/f_auto/v1623933965/images/git-article.png"
---

## What is it

Typesense an open-source alternative to Algolia and Elasticsearch

One key feature of any website or web application is the ability to search the data or content within the system. A fast and accurate search experience can improve discoverability, conversions and the overall user experience.

Building a custom search into your application can be a deeply technical and expensive endeavor in terms of man hours and subscription fees for said software. Typesense is aiming to fix those pains with it’s Open-Sourced solution to web search Typesense.

Typesense is a fast typo tolerant search engine boasting a sub-50ms search that feels instant. Typesense is built in C++, it is free to use and deploy on self hosted projects. There is also a paid option to depl

## A few notable features include:

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

### The adapter comes in 4 flavours:

- Instantsearch.js
- react-instantsearch
- vue-instantsearch
- angular-instantsearch

### Demonstration

With all that said, it’s demo time. I have built a basic demonstration using the e-commerce demo data, Typesense indexer code thanks to [@jsonbosco](https://github.com/jasonbosco), typesense-instant-search-adapter, react-instantsearch-dom and react-instantsearch ui component library.l

### Links

- [typesense.org](https://typesense.org/)
- [hub.docker.com/r/typesense](https://hub.docker.com/r/typesense/typesense/tags?page=1&ordering=last_updated)
- [producthunt.com/posts/typesense](https://www.producthunt.com/posts/typesense)

### References

- [typesense.org/docs](https://typesense.org/docs/)
