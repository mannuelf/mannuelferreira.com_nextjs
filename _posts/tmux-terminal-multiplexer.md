---
title: "Tmux a terminal multiplexer"
excerpt: "Tmux is a terminal multiplexer, allows you to have many windows panes in one terminal."
category: "Tools"
tags: "Linux, Terminal"
date: "2023-11-04T07:35:00.322Z"
author:
  name: "M Ferreira"
  picture: "https://res.cloudinary.com/mannuel/image/upload/f_auto/v1604067445/images/mee.jpg"
ogImage:
  url: "https://res.cloudinary.com/mannuel/image/upload/v1699086204/mfcom/tmux.png"
coverImage: "https://res.cloudinary.com/mannuel/image/upload/v1699086204/mfcom/tmux.png"
---

Tmux is a terminal multiplexer, it allows you to have multiple processes open in multiple window panes on your server.

All the window panes can be manged from one terminal. Servers don't have fancy multi tab terminals so yeah this is the answer.

The processes will run in the background on a tmux server. The process and windows will remain open and running even when you log out of your SSH session.

You can use it on your localhost machine as well to have multiple window panes running any process, like `npm run watch`, `npm run start` or what ever your heart desires.

![example](https://res.cloudinary.com/mannuel/image/upload/v1699087124/mfcom/tmux-example.png)

Here I have four panes opens and I can move between each pane by pressing `Ctrl+b` then `Up` or `Down`, `Left` and `Right`.

The leader key is `Ctrl` plus 'b' and  some "other key".

## Install

### Ubuntu

Do not use snap it's outdated, the latest version lives on apt.

```bash
sudo apt install tmux
```

### Mac/OSX

```bash
brew install tmux
```

## Using it

In the terminal enter:

```bash
tmux
```

This will start a tmux server and session with one window pane.

For horizontal window split: `Ctrl+b %`

For vertical window split: `Ctrl+b "`

Move up: `Ctrl+b Up`

Move down: `Ctrl+b Down`

Move left: `Ctrl+b Left`

Move right: `Ctrl+b Right`

Resize window: Press and keep pressing `Ctrl+b` while tapping `Up` or `Down` repeatedly this will increase/decrease window size in which ever direction you have chosen.

List all the commands `Ctrl+b` then `:`

### Docs

```bash
man 1 tmux
```

Deep dive the docs [here](https://github.com/tmux/tmux/wiki/Getting-Started)

That's it have fun with it.
