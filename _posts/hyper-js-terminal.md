---
title: 'Hyper terminal by Vercel'
excerpt: 'I have started using Hyper a terminal built by Vercel, I think you might like it too. Here is why...'
coverImage: 'https://res.cloudinary.com/mannuel/image/upload/v1662873007/images/hyper-post-cover.png'
date: '2022-09-11T07:18:00.322Z'
author:
  name: M Ferreira
  picture: 'https://res.cloudinary.com/mannuel/image/upload/f_auto/v1604067445/images/mee.jpg'
ogImage:
  url: 'https://res.cloudinary.com/mannuel/image/upload/v1662873007/images/hyper-post-cover.png'
---

They say 

> Tools maketh the engineer

I have started using [Hyper](https://hyper.is) as my main terminal. I think it's great and I think you might like it too.

Built by the team over at [Vercel](https://vercel.com) using [Electron Js](https://www.electronjs.org).

It's been around for a few years(3 or more) and still going strong, is actively maintained you can see the pull requests [here](https://github.com/vercel/hyper/pulls?q=is%3Apr+is%3Aclosed).

## Things I like about it

### Easily configurable via a JavaScript config

On installation a dot file called `.hyper.js` is created in your home  directory, take a closer look at mine on github [here](https://github.com/mannuelf/dot.hyper.js).

Shortened for brevity.

```js
module.exports = {
  ...
  config: {
  // choose either `'stable'` for receiving highly polished,
  // or `'canary'` for less polished but more frequent updates
  updateChannel: "stable",
  ... 
  plugins: [
    "hyper-snazzy",
    "hyperlinks",
    "hyperborder",
    "shades-of-purple-hyper",
  ],
  ...
}
``` 

note: you should move your config to a central location "config".

```bash
~/.config/Hyper/.hyper.js

```

### Plugin ecosystem

Hyper has a plugin ecosystem you can install plugins and most importantly themes very easily.

### A CLI 

Hyper has CLI to help you install those [plugins](https://hyper.is/plugins) and themes, command below will install the Shades of purple theme. 

```bash
$ hyper i shades_of_purple
```

### It's not a resource hog

It's low usage on memory is great. 

I used to use Iterm2 on mac and found that a bit hungry on memory. Hyper is winning.

![memory](https://res.cloudinary.com/mannuel/image/upload/v1662875027/images/hyper-memory.png)


### Split tabs, horizontal and vertical

Who's got time to learn [TMUX](https://tmuxcheatsheet.com) amirite! (actually tmux is a pretty cool terminal multiplexer if you are running a unix based server and want long standing process to run forever this is what you use.)

![split-tabs](https://res.cloudinary.com/mannuel/image/upload/v1662875027/images/hyper-split-screen.png)

In summary if you spend a lot time in the terminal like I do, you will love Hyper, it's fast, configurable, plugin'able (is that even a word) and finally it looks amazing the font rendering is smooth smooth smooth. 

Thanks for reading, consider sharing this post with your friends 🥳 
