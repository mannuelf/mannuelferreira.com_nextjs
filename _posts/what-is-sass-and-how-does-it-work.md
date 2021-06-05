---
title: 'What is Sass and how does it work'
excerpt: 'Sass stands for Syntactically Awesome Stylesheets. It is a CSS Pre-Processor meaning you are able to write CSS with super powers of functions, variables, loops, mixins and components or partials.'
coverImage: '/assets/blog/dynamic-routing/cover.jpg'
date: '2020-03-16T05:35:07.322Z'
author:
  name: M Ferreira
  picture: 'https://res.cloudinary.com/mannuel/image/upload/v1604067445/images/mee.jpg'
ogImage:
  url: 'https://res.cloudinary.com/mannuel/image/upload/v1604067445/images/mee.jpg'
---

Sass stands for Syntactically Awesome Stylesheets. It is a CSS Pre-Processor meaning you are able to write CSS with super powers of functions, variables, loops, mixins and components or partials.

Sass files have a special extension `.scss` and not `.css`.

Sass allows you to keep your code DRY (Do not Repeat Yourself). It allows you to make variables e.g.

## It looks like this

> main.scss

```scss
$brand-green: green;
$brand-black: #444;
$font-large: 6em;
$font-medium: 3em;
$font-small: 1em;

.card {
  background-color: $green;

  &__heading {
    font-size: $font-large;
  }

  &__paragraphs {
    font-size: $font-small;
  }
}
```

The above Sass will compile down to:

> main.css

```css
.card {
  background-color: $green;
}

.card__heading {
  font-size: $font-large;
}

.card__paragraphs {
  font-size: $font-small;
}
```

Browsers do not understand files with the `.scss` extension, which is why you have a complition step.

In the `.scss` file you can do many prgramitic things like store variables, create functions, import orther partial `.scss` files.
