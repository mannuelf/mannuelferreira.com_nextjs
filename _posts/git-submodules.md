---
title: 'Git submodules'
excerpt: git submodules are great, they allow you to add another repository to an existing project. So that you can keep your dependencies separate and managed by separate repos.'
category: 'Git'
tags: 'Github, bash'
coverImage: 'https://res.cloudinary.com/mannuel/image/upload/f_auto/v1623933965/images/git-article.png'
date: '2020-01-20T05:35:07.322Z'
author:
  name: M Ferreira
  picture: 'https://res.cloudinary.com/mannuel/image/upload/f_auto/v1604067445/images/mee.jpg'
ogImage:
  url: 'https://res.cloudinary.com/mannuel/image/upload/f_auto/v1623933965/images/git-article.png'
---

git submodules are great, they allow you to add another repository to an existing project. So that you can keep your dependencies separate and managed by separate repos.

You can leverage GIT as dependency management tool, sort of like NPM is for JavaScript.

> It's great fo decoupling code where it makes sense.

I would like to keep a repository of blog posts in its own repo, so that i can pull it into any static site generator. So if i decide to move to a new JavaScript Framework its much easier.

## Adding submodule to an existing project

Change directory into the already GIT enabled project that you want to include a sub module into.

```bash
cd project-folder/
```

### Run the submodule add command

This will initialise the submodule int you existing project.

```bash
git submodule add git@github.com:mannuelf/blog-posts.git
```

### Run git status

You will notice a new file called `.gitmodules` in your project. This file will list all submodules initialised.

```bash
git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
 new file:   .gitmodules
 new file:   blog-posts
```
