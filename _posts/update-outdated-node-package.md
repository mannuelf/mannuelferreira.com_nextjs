---
title: 'Update outdated node packages for security reasons'
excerpt: 'It is very easy to update your node packages, using an interactive cli command.'
coverImage: 'https://res.cloudinary.com/mannuel/image/upload/v1624774339/images/node-article.png'
date: '2021-06-24T00:00:07.322Z'
author:
  name: M Ferreira
  picture: 'https://res.cloudinary.com/mannuel/image/upload/v1604067445/images/mee.jpg'
ogImage:
  url: 'https://res.cloudinary.com/mannuel/image/upload/v1624774339/images/node-article.png'
---

It is very easy to update your node packages, using an interactive cli command. This is something you should check regularly for security patches and/or improvements. First of all make sure you are using YARN, [click here](https://yarnpkg.com) to install.

Run these commands in the terminal at the root level of your node project:

## yarn outdated

```bash
yarn outdated
```

output:

```bash
yarn outdated v1.22.10
info Color legend :
 "<red>"    : Major Update backward-incompatible updates
 "<yellow>" : Minor Update backward-compatible features
 "<green>"  : Patch Update backward-compatible bug fixes
Package                     Current Wanted  Latest  Workspace       Package Type    URL
@testing-library/react      11.2.7  11.2.7  12.0.0  react-drums     dependencies    https://github.com/testing-library/react-testing-library#readme
@testing-library/user-event 12.8.3  12.8.3  13.1.9  react-drums     dependencies    https://github.com/testing-library/user-event#readme
@types/node                 14.17.4 14.17.4 15.12.5 react-drums     devDependencies https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node
dotenv                      8.6.0   8.6.0   10.0.0  react-drums     dependencies    https://github.com/motdotla/dotenv#readme
eslint-config-prettier      7.2.0   7.2.0   8.3.0   react-drums     devDependencies https://github.com/prettier/eslint-config-prettier#readme
ts-node                     9.1.1   9.1.1   10.0.0  react-drums-api devDependencies https://typestrong.org/ts-node
✨  Done in 3.00s.
```

### Red

This means after the upgrade you will have to change some client side or server side code depending on what you are working on. It means that the API code for a given library has breaking changes. Functions and methods may have changed, the API code you used to build your own code before the upgrade may no longer be available or may have change to something else.

Usually the terminal will spit out errors with links to help docs if the library was well authored.

> So read carefully before proceeding

I will do this regularly to help keep my build up to date with the latest security patches, or if i want to get hold of some new feature from a package.

### Yellow

Means ok the API's have not changed that much, slight improvements have been made to existing API code. So the code you wrote before the update using said API will still work. No code changes required.

### Green

Even better, small patch, No code changes needed.

### Interactive upgrade to latest

Ok great 🚀, now you can run the update command, it will show table with radio selects showing you what new version you are updating to. Hit the "spacebar" on the keyboard to select an option, for each option.

```bash
yarn upgrade-interaction --latest
```

Output:

```bash
yarn upgrade-interactive v1.22.10
info Color legend :
 "<red>"    : Major Update backward-incompatible updates
 "<yellow>" : Minor Update backward-compatible features
 "<green>"  : Patch Update backward-compatible bug fixes
? Choose which packages to update. (Press <space> to select, <a> to toggle all, <i> to invert selection)
 dependencies
   name                         range   from        to       workspace        url
❯◯ @testing-library/react       latest  11.2.7   ❯  12.0.0   react-drums      https://github.com/testing-library/react-testing-library#readme
 ◯ @testing-library/user-event  latest  12.8.3   ❯  13.1.9   react-drums      https://github.com/testing-library/user-event#readme
 ◯ dotenv                       latest  8.6.0    ❯  10.0.0   react-drums      https://github.com/motdotla/dotenv#readme

 devDependencies
   name                         range   from        to       workspace        url
 ◯ @types/node                  latest  14.17.4  ❯  15.12.5  react-drums      https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node
 ◯ eslint-config-prettier       latest  7.2.0    ❯  8.3.0    react-drums      https://github.com/prettier/eslint-config-prettier#readme
 ◯ ts-node                      latest  9.1.1    ❯  10.0.0   react-drums-api  https://typestrong.org/ts-node
```

Screenshot:

![screenshot](/assets/blog/update-outdated-node-packages/img1.png)

YARN will do its thing and updated chosen packages.

Have fun keeping your builds up to date 👋
