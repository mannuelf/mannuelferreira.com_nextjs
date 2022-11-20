---
title: 'Deno avoid import path cannot end in a extension warning'
excerpt: 'How to avoid the import path cannot end with a .ts extension error in vscode'
coverImage: 'https://res.cloudinary.com/mannuel/image/upload/v1668935182/images/deno-cover.png'
date: '2022-11-20T10:25:00.322Z'
author:
  name: M Ferreira
  picture: 'https://res.cloudinary.com/mannuel/image/upload/f_auto/v1604067445/images/mee.jpg'
ogImage:
  url: 'https://res.cloudinary.com/mannuel/image/upload/v1668935182/images/deno-cover.png'
---

A common error when starting out coding with Deno is this annoying awarning about not being allowed to import using file extentions.

> An import path cannot end with a '.ts' extension. Consider importing './data/plays.js' instead.ts(2691)

![error](https://res.cloudinary.com/mannuel/image/upload/v1668935347/images/imports.png)

To get around this is pretty easy easy.

## 1. Install Deno extensions

[VSCODE-DENO](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)

## 2. Enable deno.lint

Type `CTRl+,` to bring up the settings panel and search for `deno.lint`.

![deno-lint](https://res.cloudinary.com/mannuel/image/upload/v1668935851/images/deno-lint-settings.png)

This will create a `settings.json` file in your `.vscode` folder.

## 3. Next add some configurations.

They are:

```js
{
  "deno.enable": true,
  "deno.lint": true
}
```

## 4. Success

Jobs done:

![success](https://res.cloudinary.com/mannuel/image/upload/v1668936187/images/success-lint.png)
