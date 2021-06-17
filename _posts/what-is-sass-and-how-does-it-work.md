---
title: 'What is Sass and how does it work'
excerpt: 'Sass stands for Syntactically Awesome Stylesheets. It is a CSS Pre-Processor meaning you are able to write CSS with super powers of functions, variables, loops, mixins and components or partials.'
coverImage: 'https://res.cloudinary.com/mannuel/image/upload/v1623933698/images/sass-article.png'
date: '2020-03-11T05:35:07.322Z'
author:
  name: M Ferreira
  picture: 'https://res.cloudinary.com/mannuel/image/upload/v1604067445/images/mee.jpg'
ogImage:
  url: 'https://res.cloudinary.com/mannuel/image/upload/v1623933698/images/sass-article.png'
---

This is a beginner friendly whirlwind tour of setting up Sass.

Sass stands for `Syntactically Awesome Stylesheets`.

It is a CSS Pre-Processor meaning you are able to write programmable CSS. What's that mean? It means you have the ability to create reusable bits of Sass code to achieve your styling. You have ability to create variables, mixin (these are like function with arguments). You can split your CSS up into separate single purpose files with a good naming convention like `_vars.scss` , `_header.scss` etc.

Sass files have a special extension `.scss` and not `.css`.

Sass allows you to keep your code DRY (Do not Repeat Yourself). It allows you to make variables e.g.

## Install Sass

In order to use Sass you must install it on your machine, global or at project level. The next step assumes you have NODE JS installed, if you do not [click here](https://nodejs.org/en/download/) to do so first.

To follow along, manually create a website folder to work in that looks like this:

```bash
/website-sass
---/src
----/scss
      _vars.scss
      _header.scss
      base.scss
----/public
      index.html
```

Then come back and run this command in the terminal.

```bash
npm install -g sass
```

Once Sass is installed you have access to the Command Line Tool (CLI). Running this command in the terminal will initiate Sass to take base.scss and save it to styles.min.css.

```bash
sass /src/scss/base.scss /public/css/styles.min.css
```

```js
[cmd] [source]           [destination]
```

```bash
command > is the CLI command exposed by the Node JS package you installed.
source > this is the source, where your sass files are
destination > this is where the bundled css will be save to
```

## How it works

Here were are breaking up our CSS into logical modules. `base.scss` will be our root file, this file will import the other partials. Sass will take care of compiling and generating one global.css file.

```scss
base.scss
_vars.scss
_header.scss
```

### base.scss

Sass will import these two files into one global context and generate one css file to be used in a simple html webpage.

```scss
@import 'vars';
@import 'header';
```

### _var.scss

Variables are key value pairs. The name of the variable followed by the value you want to use.

```scss
$brand-green: #008000;
$brand-black: #444444;
$font-large: 6em;
$font-medium: 3em;
$font-small: 1em;
```

### _header.scss

```scss
.header {
  background-color: $brand-green;

  &__heading {
    font-size: $font-large;
  }

  &__links {
    font-size: $font-small;
  }
}
```

The above Sass will compile down to styles.min.css (based on my command above):

Notice that the variables have now resolved to their values the colours and font sizes setup in the Sass files.

```css
.header {
  background-color: #008000;
}

.header__heading {
  font-size: 6em;
}

.header__links {
  font-size: 2em;
}
```

Browsers do not understand files with the `.scss` extension, which is why you need to install the sass compiler, it does the work of reading you Sass files and generating a css file for the browser.

### What to know more?

Now there is a lot more to it than what I've shown also keep in mind technologies change over time, head over to the documenting [@import phase out plan](https://sass-lang.com/documentation/at-rules/import) to keep up to date.

- [@use](https://sass-lang.com/documentation/at-rules/use)
- [@mixin and @include](https://sass-lang.com/documentation/at-rules/mixin)
- [@function](https://sass-lang.com/documentation/at-rules/function)
