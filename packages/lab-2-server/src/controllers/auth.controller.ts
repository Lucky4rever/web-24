import { Request, Response } from 'express';
import { v4 } from 'uuid';
import dotenv from 'dotenv';
import { hashPassword, comparePasswords, generateToken } from '../services/auth.service';
import UserDatabase from '../db/users.db';
import { User } from '../models/user.model';
import { verifyToken } from '../middlewares/auth.middleware';

dotenv.config();

const secret = process.env.JWT_SECRET;

export const registerUser = async (req: Request, res: Response) => {
  const { username, password }: User = req.body;

  const setupUserRole = (password: string) => (password === process.env.ADMIN_PASSWORD ? 'admin' as const : 'user' as const);

  if (UserDatabase.getUserByName(username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await hashPassword(password);
  const newUser = { id: v4(), username, password: hashedPassword, role: setupUserRole(password) };
  UserDatabase.addUser(newUser);
  res.status(201).json({ message: 'User registered successfully' });
};

export const loginUser = async (req: Request, res: Response) => {
  if (!secret) {
    return res.status(500).json({ message: 'Internal server error' });
  }

  const { username, password } = req.body;
  const user = UserDatabase.getUserByName(username);

  if (!user || !(await comparePasswords(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user, secret);
  res.json({ token });
};

export const verifyUser = async (req: Request, res: Response) => {
  if (!secret) {
    return res.status(500).json({ message: 'Internal server error' });
  }

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    const user = verifyToken(token, secret);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
