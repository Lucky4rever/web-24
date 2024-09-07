import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = ({ id }: User, secret: string) => {
  return jwt.sign({ id }, secret, { expiresIn: '1h' });
};
