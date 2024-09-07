import jwt from 'jsonwebtoken';
import UsersDatabase from '../db/users.db';

export const verifyToken = (token: string, secret: string) => {
  const decoded: jwt.JwtPayload = jwt.verify(token, secret) as jwt.JwtPayload;

  const user = UsersDatabase.getUserById(decoded.id);

  return user;
};
