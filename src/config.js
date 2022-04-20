import { config } from 'dotenv';

config();
export const appConfig = {
  PORT: process.env.PORT || 3000,
  USER: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  SERVER: process.env.SERVER,
  DATABASE: process.env.DATABASE,
  SIZE: Number(process.env.SIZE),
  SECRET_KEY: process.env.SECRET_KEY,
};
