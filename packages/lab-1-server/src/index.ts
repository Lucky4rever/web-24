import path from 'node:path';
import { createServer } from 'node:http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import SocketRouter from './sockets';
import { Server } from 'socket.io';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = createServer(app);
const ioServer = new Server(server);

app.get('/', (_, res) => { res.sendFile(path.join(__dirname, '../public/index.html')); });
// app.get('/chat/:chatId', (_, res) => { res.sendFile(path.join(__dirname, '../public/chat.html')); });

const socketRouter = new SocketRouter(ioServer);
socketRouter.init();

const host = '127.0.0.1';
const port = 4000;

server.listen(port, host, () => {
  console.log(`Server is running on port http://${host}:${port}`);
});
