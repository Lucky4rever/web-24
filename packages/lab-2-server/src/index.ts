import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes';
import UsersDatabase from './db/users.db';

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.send("lab 2 server is running");
});

app.get('/users', (_, res) => {
  res.send(UsersDatabase.getUsers());
});

app.use('/users', authRouter);

const host = '127.0.0.1';
const port = 4000;

app.listen(port, host, () => {
  console.log(`Server is running on port http://${host}:${port}`);
});
