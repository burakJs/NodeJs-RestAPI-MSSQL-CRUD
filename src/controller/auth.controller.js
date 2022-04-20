import {
  getConnection,
  sql,
  AuthQueries,
  appConfig,
} from '../database/index.js';
import bcrypt from 'bcrypt';

const pool = await getConnection();
// const isSame = await bcrypt.compare(user_password, hash);

export const register = async (req, res) => {
  const { user_name, user_password } = req.body;
  const salt = await bcrypt.genSalt(appConfig.SIZE);
  const hash = await bcrypt.hash(user_password, salt);
  const isExist = await isUserExists(user_name);

  if (isExist) {
    res.status(500);
    return res.json({ error: `${user_name} is exists` });
  }

  try {
    await pool
      .request()
      .input('user_name', sql.VarChar, user_name)
      .input('user_password', sql.VarChar, hash)
      .query(AuthQueries.register);
    return res.json({ data: `${user_name} kaydedildi`, isSuccess: true });
  } catch (error) {
    return res.json({ error: error.message, isSuccess: false });
  }
};

export const login = async (req, res) => {};

const isUserExists = async (user_name) => {
  const isExists = await pool
    .request()
    .input('user_name', sql.VarChar, user_name)
    .query(AuthQueries.isUserExists);
  console.log(isExists.recordset[0]['UserCount'] == 1);
  return isExists.recordset[0]['UserCount'] == 1;
};
