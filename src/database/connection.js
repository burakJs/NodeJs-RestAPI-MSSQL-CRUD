import sql from 'mssql';
import config from '../config.js';
const dbSettings = {
  user: config.USER,
  password: config.PASSWORD,
  server: config.SERVER,
  database: config.DATABASE,
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
