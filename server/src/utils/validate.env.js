import { cleanEnv, str, port } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production'],
    }),
    MONGO_URL: str(),
    PORT: port({ default: 8800 }),
    TMDB_BASE_URL: str(),
    TMDB_KEY: str(),
    JWT_SECRET: str(),
    OPENAI_API_KEY: str(),
  });
}

export default validateEnv;
