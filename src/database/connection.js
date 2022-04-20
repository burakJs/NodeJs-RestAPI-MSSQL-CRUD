import sql from 'mssql';
import { appConfig } from '../config.js';

const dbSettings = {
  user: appConfig.USER,
  password: appConfig.PASSWORD,
  server: appConfig.SERVER,
  database: appConfig.DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.log(error);
  }
};

export { sql };
