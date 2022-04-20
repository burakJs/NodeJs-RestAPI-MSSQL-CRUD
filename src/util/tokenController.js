import jwt from 'jsonwebtoken';
import { appConfig } from '../config.js';

export const isTokenExist = (token) => {
  try {
    jwt.verify(token, appConfig.SECRET_KEY);
    return { isSuccess: true };
  } catch (error) {
    return { error: error, isSuccess: false };
  }
};

export const createToken = (payload) => {
  try {
    const result = jwt.sign(payload, appConfig.SECRET_KEY);
    return { token: result, isSuccess: true };
  } catch (error) {
    return { error: error, isSuccess: false };
  }
};
