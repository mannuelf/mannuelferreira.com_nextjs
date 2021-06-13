# Setup unit test for NEXT JS

## Testing in

## ABC

### ABCDE

#### Resources and Research

[https://stackoverflow.com/questions/63934104/environment-variables-undefined-in-nextjs-when-running-jest](https://stackoverflow.com/questions/63934104/environment-variables-undefined-in-nextjs-when-running-jest)

[https://hobochild.com/posts/testing.html](https://hobochild.com/posts/testing.html)

[https://www.npmjs.com/package/node-mocks-http](https://www.npmjs.com/package/node-mocks-http)

[https://www.kyrelldixon.com/blog/setup-jest-and-react-testing-library-with-nextjs](https://www.kyrelldixon.com/blog/setup-jest-and-react-testing-library-with-nextjs)

[https://github.com/vercel/next.js/blob/canary/test/integration/api-support/test/index.test.js](https://github.com/vercel/next.js/blob/canary/test/integration/api-support/test/index.test.js)

[https://spectrum.chat/next-js/general/api-routes-unit-testing~aa868f97-3a7d-45fe-97e5-3f0408f0022d](https://spectrum.chat/next-js/general/api-routes-unit-testing~aa868f97-3a7d-45fe-97e5-3f0408f0022d)

[https://github.com/Xunnamius/next-test-api-route-handler](https://github.com/Xunnamius/next-test-api-route-handler)

[https://stackoverflow.com/questions/16802030/whats-the-difference-between-tests-and-specs](https://stackoverflow.com/questions/16802030/whats-the-difference-between-tests-and-specs)

### Issues with environment variables

Environment variables will not load by default in the unit tests without using next/env and resolving the path to global path.

in the `jest.config.js` set the global path point it to a config file you will create.

```js
export default {
  ...
  globalSetup: '<rootDir>/test.env.js',
  ...
}
```

create config file in the root directory called `test.env.js`

```js
import { loadEnvConfig } from '@next/env';
import { resolve } from 'path';

export default async () => {
  const envFile = resolve(__dirname, '.');
  loadEnvConfig(envFile);
};
```

[https://github.com/vercel/next.js/issues/17903](https://github.com/vercel/next.js/issues/17903)

[https://github.com/vercel/next.js/issues/22936#issuecomment-796665303](https://github.com/vercel/next.js/issues/22936#issuecomment-796665303)
