import { config as conf } from "dotenv";

conf();

const _config = {
  databaseUrl: process.env.MONGO_CONNECTION_STRING,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
};

export const config = Object.freeze(_config);
