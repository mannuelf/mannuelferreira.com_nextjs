---
title: "Environment variables inside of NodeJs and Github actions CI/CD pipeline with Playwright test"
excerpt: "A guide to testing environment variables in NodeJs project and runnig it a github actions CI/CD pipeline using Playright"
category: "Testing"
tags: "NodeJs, Playwright, GitHub Actions"
coverImage: "https://res.cloudinary.com/mannuel/image/upload/v1669673297/images/github-actions-cover.png"
date: "2022-11-28T06:25:00.322Z"
author:
  name: M Ferreira
  picture: "https://res.cloudinary.com/mannuel/image/upload/f_auto/v1604067445/images/mee.jpg"
ogImage:
  url: "https://res.cloudinary.com/mannuel/image/upload/v1669673297/images/github-actions-cover.png"
---

This guide will show you how to inject environment variables into the Github actions pipeline. the context of this guide is to have our tests run in the pipeline in the same way as they run on our localhost.

We will write a simple test to ensure that the project has a `.env` file with values present.

In the project you may or may not have `.env` file holding all variables required throughout your [12 Factor](https://12factor.net/) app. If not create them now.

## 1. create .env files

In root of project:

```bash
touch .env
```

```bash
touch .env.example
```

## 2. Add variables to file

.env

```bash
API_BASE_URL="https://api.website.com/v1/"
API_KEY="adbcefg"
```

.env.example (empty values for the example file) It's a good idea to have an example `.env` file so the next engineer knows what variables are required.

```bash
API_BASE_URL=
API_KEY=
```

## 3. Create the test file and test

In project root:

```ts
mkdir tests
```

```bash
touch tests/env.spec.ts
```

All code below should be written in the same file.

Import dependencies, playright, dotenv and path:

```ts
import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
```

- Read a specific `.env` file depending on whether it's run on localhost or the CI pipeline.
- We want the pipeline to run against the `.env.example` which is commited to git.
- The `.env` is not and should never be commited to git.

```ts
dotenv.config({ path: path.resolve(__dirname, "..", process.env.CI ? ".env.example" : ".env") });
```

- Grab the variables using destructuring

```ts
const { API_BASE_URL, API_KEY } = process.env;
```

- create a user freiendly messsage to output in the console later on should the test fail.

```js
let environmentVarWarning =
  "❗ No environment variable found, use the .env.example file to create your own .env file with required properties and values.";
```

- Create a describe so multple tests can be grouped, plan to run 2 tests

```js
test.describe('Environment variables present and configured', async () => {
  ...
});
```

```js
test.describe("Environment variables present and configured", async () => {
  // 1
  test("API_BASE_URL is present", async () => {
    expect(API_BASE_URL, environmentVarWarning).toBeDefined();
  });

  // 2
  test("API_KEY is present", async () => {
    expect(API_KEY, environmentVarWarning).toBeDefined();
  });
});
```

The final look fo the test:

```js
import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, "..", process.env.CI ? ".env.example" : ".env") });

const { API_BASE_URL, API_KEY } = process.env;

let environmentVarWarning =
  "❗ No environment variable found, use the .env.example file to create your own .env file with required properties and values.";

test.describe("Environment variables present and configured", async () => {
  test("API_BASE_URL is present", async () => {
    expect(API_BASE_URL, environmentVarWarning).toBeDefined();
  });

  test("API_KEY is present", async () => {
    expect(API_KEY, environmentVarWarning).toBeDefined();
  });
});
```

## 4. Create the pipeline file

Guthub actions allows you execute bash commands and allows you to run runtime variables in your pipeline by using the `run:` command.

Write your variable creator command right before you need, in this context I need them before my tests execute.

Zoom into the `steps` section to see "Creates environment variables" heading and configurations.

```bash
name: Playwright Tests
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - name: Creates environment variables
        run: |
          echo "API_BASE_URL: https://ws.audioscrobbler.com/2.0/"
          echo "API_KEY: abcdefghijklmnopqrstuvxyz"
    ...
```

- The pipeline triggers are set to run this action on push and on pull request.
- creates jobs called test
- creates steps
  - uses actions checkout
  - users actions setup node, specifies version of 16
  - uses action pnpm, specifies version 7.14.1
  - Installs dependencies with pnpm
  - creates environment variables

Here is the completed file:

```bash
name: Playwright Tests
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - uses: pnpm/action-setup@v2
        with:
          version: 7.14.1
      - name: Install dependencies
        run: pnpm install
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Creates environment variables
        run: |
          echo "API_BASE_URL: https://ws.audioscrobbler.com/2.0/"
          echo "API_KEY: abcdefghijklmnopqrstuvxyz"
      - name: Run Playwright tests
        run: pnpm dlx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

And here is how the pipeline looks:

![pipeline](https://res.cloudinary.com/mannuel/image/upload/v1669671668/images/pipeline.png)

[Click here](https://github.com/mannuelf/lastfm-nodejs-client/actions/runs/3562147466/jobs/5983622759) to see it live in Github.

I hope you enjoyed this whirlwind tour, concider sharing with your colleagues and friends.
