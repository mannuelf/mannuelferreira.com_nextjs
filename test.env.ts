import { loadEnvConfig } from '@next/env';
import { resolve } from 'path';

const testEnv = async () => {
  const envFile = resolve(__dirname, '.');
  loadEnvConfig(envFile);
};

export default testEnv;
