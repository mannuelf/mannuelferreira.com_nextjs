---
title: 'Syncing a forked repo in the terminal'
excerpt: 'A fork is your very own copy of some code which you can make changes locally without fear of breaking anything upstream (more on this later). You are free to add some feature and suggest that new feature be added back to the upstream repository.'
category: 'Git'
tags: 'bash, Linux, terminal'
coverImage: 'https://res.cloudinary.com/mannuel/image/upload/f_auto/v1623933444/images/github-article.png'
date: '2020-05-16T15:30:00.322Z'
author:
  name: M Ferreira
  picture: 'https://res.cloudinary.com/mannuel/image/upload/f_auto/v1604067445/images/mee.jpg'
ogImage:
  url: 'https://res.cloudinary.com/mannuel/image/upload/f_auto/v1623933965/images/github-article.png'
---

GitHub allows you to contribute to open source projects by making your own copy of a repository (repo). This is called a `fork`.

A fork is your very own copy of some code which you can make changes locally without fear of breaking anything upstream (more on this later). You are free to add some feature and suggest that new feature be added back to the upstream repository.

Forking creates a new context and a relationship between you and the original repository. The original repo is considered `upstream` branch and your fork to you is considered `origin`.

Checking to see who is who is very easy. After forking and cloning a repo run the following command in the terminal.

I have forked [DefinitelyTyped](https://github.com/mannuelf/DefinitelyTyped).

clone repo:

```bash
git clone git@github.com:mannuelf/DefinitelyTyped.git
```

Checking to see who is who is very easy. After forking and cloning a repo run the following command in the terminal.

```bash
cd DefinitelyTyped
```

issue this command in the terminal:

```bash
git remote -v
```

output:

```bash
origin git@github.com:mannuelf/DefinitelyTyped.git (fetch)
origin git@github.com:mannuelf/DefinitelyTyped.git (push)
```

`origin` is referring to me, as in my forked copy under my account, you can see this as it has my name `mannuelf/DefinitelyTyped.git` in the URL.

GREAT 🚀

## Merge upstream/master

What happens if DefinitelyTyped is updated and my fork has gotten out of date. I should git pull in those changes but it's not so straight forward.

You will have to fetch upstream/master and merge upstream/master into your local copy. Wait what the heck is upstream/master? Remember you are `origin` and they are `upstream`.

### Connect to upstream repo

The connection to `upstream` is not configured by default, you have to tell your repo where the upstream repo is.

issue this command:

```bash
git remote add upstream https://github.com/mannuelf/DefinitelyTyped
```

then check your config:

```bash
git remote -v
```

```bash
origin git@github.com:mannuelf/DefinitelyTyped.git (fetch)
origin git@github.com:mannuelf/DefinitelyTyped.git (push)
upstream https://github.com/DefinitelyTyped/DefinitelyTyped (fetch)
upstream https://github.com/DefinitelyTyped/DefinitelyTyped (push)
```

Great, there you can see two new entries into your config `upstream` appears twice, once for fetching and once for push.

run:

```bash
git fetch upstream && git merge upstream/master
```

This will connect `upstream` to DefinitelyTyped and fetch all new changes and merge them into my origin branch.

output:

```bash
remote: Enumerating objects: 241, done.
remote: Counting objects: 100% (241/241), done.
remote: Compressing objects: 100% (183/183), done.
remote: Total 241 (delta 137), reused 115 (delta 58), pack-reused 0
Receiving objects: 100% (241/241), 106.39 KiB | 999.00 KiB/s, done.
Resolving deltas: 100% (137/137), completed with 18 local objects.
types/findup-sync/findup-sync-tests.ts                                   |     16 +-
types/findup-sync/index.d.ts                                             |     18 +-
types/firstline/firstline-tests.ts                                       |     13 +-
...
```

Notes:

Newer projects on GitHub initialise by default to `main` branch and not `master`. So the command you issue should changed based on the project.

If the project is using main branch issue:

```bash
git fetch upstream && git pull upstream/main
```
