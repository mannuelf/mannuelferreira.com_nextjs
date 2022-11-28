---
title: 'Runtime aka environment variables in NodeJs and Github Actions CI/CD pipeline with Playwright test'
excerpt: 'A guide to testing environment variables in NodeJs project and runnig it a github actions CI/CD pipeline using Playright'
coverImage: 'https://res.cloudinary.com/mannuel/image/upload/v1669098514/images/kubernetes-cover.png'
date: '2022-11-22T06:25:00.322Z'
author:
  name: M Ferreira
  picture: 'https://res.cloudinary.com/mannuel/image/upload/f_auto/v1604067445/images/mee.jpg'
ogImage:
  url: 'https://res.cloudinary.com/mannuel/image/upload/v1669098514/images/kubernetes-cover.png'
---

Getting started with Kubernetes you will need `kubectl` command line tool.

## 1. Install kubectl binary

This command will bring down the latest version.

```ts
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
```

```ts
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '..', process.env.CI ? '.env.example' : '.env') });
```

```ts
const { LASTFM_API_BASE_URL, LASTFM_API_KEY } = process.env;
```

```js
let environmentVarWarning =
  '❗ No environment variable found, use the .env.example file to create your own .env file with required properties and values.';
```

```js

```

```js

```

The final look fo the test

```js
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '..', process.env.CI ? '.env.example' : '.env') });

const { LASTFM_API_BASE_URL, LASTFM_API_KEY } = process.env;

let environmentVarWarning =
  '❗ No environment variable found, use the .env.example file to create your own .env file with required properties and values.';

test.describe('Environment variables present and configured', async () => {
  test('LASTFM_API_BASE_URL is present', async () => {
    expect(LASTFM_API_BASE_URL, environmentVarWarning).toBeDefined();
  });

  test('LASTFM_API_KEY is present', async () => {
    expect(LASTFM_API_KEY, environmentVarWarning).toBeDefined();
  });
});
```
