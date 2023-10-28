---
title: "Traefik, Docker and your vps part 1"
excerpt: "I love playing with servers and if you do too keep reading. I will show you how to setup a Traefik proxy and docker environment on your VPS."
category: "Linux"
tags: "traefik, docker, vps"
date: "2023-10-10T07:35:00.322Z"
author:
  name: "M Ferreira"
  picture: "https://res.cloudinary.com/mannuel/image/upload/f_auto/v1604067445/images/mee.jpg"
ogImage:
  url: "https://res.cloudinary.com/mannuel/image/upload/v1676011525/mfcom/ssh-login.png"
coverImage: "https://res.cloudinary.com/mannuel/image/upload/v1676011525/mfcom/ssh-login.png"
---

I have an amazing website here [www.themwebs.me](https://www.themwebs.me) it's fast simple and cheaply hosted with a yearly fixed cost on a VPS with [www.hostinger.com](https://hostinger.com?REFERRALCODE=1MANNUELFER05).

I wanted a space where I could play with server technology like Traefik and docker.

I needed a place to host backend APIs that I might create like this [one](https://factbookapi.themwebs.me/population-levels) made with with python using [Flask](https://flask.palletsprojects.com).

Now if playing with servers is not your jam, stop reading and head over to your favourite backend as service or servless platforms those are great too I use them often.

knowledge about docker is assumed. I will be focusing on Traefik and configuring it more than [docker basics](https://www.docker.com/101-tutorial).

## Ready?

Let's go.

## What

We will be building a small microservices architecture on our server using docker.

## Why

So that we can quickly deploy backend api using any language. It's fun to try out new languages and frameworks e.g Deno, Rust and maybe some Go lang in the future. This way we will be able to deploy the code and have live URL's to test with.

## How

We will be using docker, docker compose and Traefik as the proxy to containers.

I have already set up a repo with different "services" [here](https://github.com/mannuelf/them-webs-vps).

It includes:

- one folder per service, each service has it's own Dockerfile
- docker-compose file to start the services.
- traefik.toml
- treafik_dynamic.toml

## Traefik

> Traefik is an open-source Edge Router that makes publishing your services a fun and easy experience. It receives requests on behalf of your system and finds out which components are responsible for handling them.
> source: [Traefik](https://doc.traefik.io/traefik)

Imagine you have a website at www.website.com and an api at api.website.com, Traefik will direct the request to the appropriate service based on the sub domain.

Traefik will also help create SSL certificates using ACME provider [Lets Encrypt](https://letsencrypt.org/).

This is configured via a .toml configuration file called traefik.toml and treafik_dynamic.toml. In these configuration files we specify:

- Entry points,
- Routers
- Middlewares, e.g SSL certificate resolver.
- Services Traefik supports

## treafik.toml

Read file [here](https://github.com/mannuelf/them-webs-vps/blob/main/traefik.toml)

```toml
[entryPoints]
  [entryPoints.web]
    address = ":80"
    [entryPoints.web.http.redirections.entryPoint]
      to = "websecure"
      scheme = "https"

  [entryPoints.websecure]
    address = ":443"

[api]
  dashboard = true

[certificatesResolvers.lets-encrypt.acme]
  email = "mannuel@themwebs.me"
  storage = "acme.json"
  [certificatesResolvers.lets-encrypt.acme.tlsChallenge]

[providers.docker]
  watch = true
  network = "web"

[providers.file]
  filename = "traefik_dynamic.toml"
```

## traefik_dynamic.toml

Read file [here](https://github.com/mannuelf/them-webs-vps/blob/main/traefik_dynamic.toml)

```toml
[http.middlewares.simpleAuth.basicAuth]
  users = [
    "admin:$apr1$futE7qd5$CWn820MIlYZm4RILGBlB0/"
  ]

[http.routers.api]
  rule = "Host(`monitor.localhost`)"
  entrypoints = ["websecure"]
  middlewares = ["simpleAuth"]
  service = "api@internal"
  [http.routers.api.tls]
    certResolver = "lets-encrypt"
```

That will do for now, take a break or head over to part 2 for me details on the configuration and how we will deploy all of this.
