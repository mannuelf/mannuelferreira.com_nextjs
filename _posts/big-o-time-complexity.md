---
published: true
title: "Big O Notation and time complexity"
excerpt: "What is is Big O, what does time complexity even mean?"
category: "Data Structures and Algorithms"
tags: "Data structures, Algorithms"
date: "2023-11-16T07:35:00.322Z"
author:
  name: "M Ferreira"
  picture: "https://res.cloudinary.com/mannuel/image/upload/f_auto/v1604067445/images/mee.jpg"
ogImage:
  url: "https://res.cloudinary.com/mannuel/image/upload/v1700164934/algorithms_cover.png"
coverImage: "https://res.cloudinary.com/mannuel/image/upload/v1700164934/algorithms_cover.png"
---

Lets take a slow and steady approach to learning about Big O and how it relates
to algorithms.

## What is an algorithm?

An algorithm is a sequence of steps, or instructions given to a computer to execute.

In the physical world a recipe is an algorithm.

If you ask some one "Hey how do I make Lemon drizzle cake". You might reach for recipe, this recipe will in detailed steps explain to the baker how to make it.

Here is an algorithm to making a Lemon Drizzle Cake:N

Note: it takes 45-50 minutes to bake one.

```text
STEP 1
Heat the oven to 180C/160C fan/gas 4.

STEP 2
Beat together the butter and caster sugar until pale and creamy, then add the eggs, one at a time, slowly mixing through.

STEP 3
Sift in the self-raising flour, then add the lemon zest and mix until well combined.

STEP 4
Line a 2 lb (about 14 x 24cm) loaf tin with greaseproof paper, then spoon in the mixture and level the top with a spoon.

STEP 5
Bake for 45-50 mins until a thin skewer inserted into the centre of the cake comes out clean.

STEP 6
While the cake is cooling in its tin, mix together the lemon juice and caster sugar to make the drizzle.

STEP 7
Prick the warm cake all over with a skewer or fork, then pour over the drizzle – the juice will sink in and the sugar will form a lovely, crisp topping.

STEP 8
Leave in the tin until completely cool, then remove and serve. Will keep in an airtight container for 3-4 days, or freeze for up to 1 month.
```

## What is Big O?

Big O is a way of talking about how efficient an algorithm is. An algorithm is a
set of instructions that tell the computer to do something. A sequence of steps
from the start to some end.

### Linear search

In this example we will tell the computer to console log each index of the given
array.

```js
const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

```js
for (let i = 0; i < numArray.length; i++) {
  console.log(array[i]);
}
```

In plain english we could say:

> Ok there are ten numbers in the array, so it will take ten steps to read each
> index of the array, therefore I will see ten console logs.

This would be correct, but that statement doesn't tell us anything about how
"fast or slow" this algorithm is.

This is where Big O comes in. Big O is a way of describing how long an algorithm
will take to run.

## What is time complexity

Time complexity is a way of describing how long an algorithm will take to run.
