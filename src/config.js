import { config } from 'dotenv';

config();

export default {
  PORT: process.env.PORT || 3000,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  SERVER: process.env.SERVER,
  DATABASE: process.env.DATABASE,
};
