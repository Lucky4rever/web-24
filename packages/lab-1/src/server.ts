import express from 'express';
import http from 'node:http';
import path from 'node:path';
import { Server } from 'socket.io';
import { SocketRequest, SocketResponse } from './consts';
import { User, usersInRooms } from './users';

const app = express();
app.use(express.static(path.resolve(__dirname, '../public')));

const server = http.createServer(app);
const io = new Server(server);

io.on(SocketRequest.CONNECTION, (socket) => {
  let currentUser: User | undefined = undefined;

  socket.on(SocketRequest.JOIN_ROOM, (user: Omit<User, 'id'>) => {
    const { username, room } = user;
    currentUser = { id: socket.id, ...user };

    socket.join(room);

    const currentRoomUsers = usersInRooms.get(room) || [];
    currentRoomUsers.push(currentUser);

    usersInRooms.set(room, currentRoomUsers);

    io.to(room).emit(SocketResponse.USER_JOINED, {
      username: username,
      usersInRoom: currentRoomUsers,
    });

    io.to(room).emit(SocketResponse.SYSTEM_MESSAGE, {
      message: `User ${username} joined the room`
    })
  });

  socket.on(SocketRequest.MESSAGE, (message: string) => {
    if (!currentUser) {
      return;
    }

    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    io.to(currentUser.room).emit(SocketResponse.CHAT_MESSAGE, {
      username: currentUser.username,
      time: time,
      message: message
    });
  });

  socket.on(SocketRequest.DISCONNECT, () => {
    if (!currentUser) {
      return;
    }

    const currentRoomUsers = usersInRooms.get(currentUser.room)!.filter(user => user.id !== currentUser?.id);
    usersInRooms.set(currentUser.room, currentRoomUsers);

    io.to(currentUser.room).emit(SocketResponse.USER_LEFT, {
      username: currentUser.username,
      usersInRoom: currentRoomUsers,
    });

    io.to(currentUser.room).emit(SocketResponse.SYSTEM_MESSAGE, {
      message: `User ${currentUser.username} left the room`
    })
  });
});

server.listen(3000, () => {
  console.log('Сервер працює на порту 3000');
});