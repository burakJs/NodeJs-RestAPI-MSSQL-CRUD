import {
  getConnection,
  sql,
  AuthQueries,
  appConfig,
} from '../database/index.js';
import { createToken, isTokenExist } from '../util/tokenController.js';
import bcrypt from 'bcrypt';

const pool = await getConnection();

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

export const login = async (req, res) => {
  const { user_name, user_password } = req.body;

  const isExist = await isUserExists(user_name);

  if (!isExist) {
    res.status(500);
    return res.json({
      error: `${user_name} not found`,
      isSuccess: false,
      token: null,
    });
  }

  const { dbUserName, dbUserPassword } = await getOneUserDatas(user_name);

  const isExistWithPass = await bcrypt.compare(user_password, dbUserPassword);

  if (!isExistWithPass) {
    return res.json({
      error: 'User not found with these credentials',
      isSuccess: false,
      token: null,
    });
  }

  const payload = { userName: dbUserName, password: dbUserPassword };
  const tokenData = createToken(payload);

  if (!tokenData.isSuccess) {
    return res.json({
      error: "Can't create token for this account",
      isSuccess: false,
    });
  } else {
    return res.json({ token: tokenData.token, isSuccess: true });
  }
};

const isUserExists = async (user_name) => {
  const isExists = await pool
    .request()
    .input('user_name', sql.VarChar, user_name)
    .query(AuthQueries.isUserExists);

  return isExists.recordset[0]['UserCount'] == 1;
};

const getOneUserDatas = async (user_name, user_password) => {
  const userRequest = await pool
    .request()
    .input('user_name', sql.VarChar, user_name)
    .query(AuthQueries.getOneUser);

  console.log(userRequest);
  return {
    dbUserName: userRequest.recordset[0]['user_name'],
    dbUserPassword: userRequest.recordset[0]['user_password'],
  };
};
