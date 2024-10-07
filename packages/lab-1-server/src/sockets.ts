import { Server } from 'socket.io';
import { v4 } from 'uuid';
import { SocketRequest, SocketResponse } from './consts/sockets.const';
import { Message, User } from './models';
import ChatService from './services/chat.service';

class SocketRouter {
  private io: Server;
  private chatService: ChatService;

  private get chatId(): string {
    return 'demo-chat';
  }

  constructor(io: Server) {
    this.io = io;

    this.chatService = new ChatService();
  }

  init() {
    this.io.on(SocketRequest.CONNECT, (socket) => {
      console.log('User connected:', socket.id);

      socket.emit(SocketResponse.CHAT_INFO, { chatId: this.chatId });
      socket.emit(SocketResponse.ALL_MESSAGES, this.chatService.getChatMessages(this.chatId));
      this.broadcastUserList(this.chatId);
      
      socket.on(SocketRequest.ADD_USER, async (user: User) => {
        console.log('User added:', user);
        this.chatService.addUserToChat(this.chatId, user);
        this.broadcastUserList(this.chatId);
      });

      socket.on(SocketRequest.ADD_MESSAGE, async (message: Omit<Message, "id" | "createdAt">) => {
        const messageData: Message = {
          id: socket.id,
          ...message,
          createdAt: new Date().toISOString(),
        };

        this.chatService.addMessageToChat(this.chatId, messageData);
        this.io.emit(SocketResponse.NEW_MESSAGE, messageData);
      });

      socket.on(SocketRequest.DISCONNECT, async () => {
        console.log('User disconnected:', socket.id);
        this.chatService.removeUserFromChat(this.chatId, socket.id);
        this.broadcastUserList(this.chatId);
      });
    });
  }

  private async broadcastUserList(chatId: string) {
    const users = await this.chatService.getChatUsers(chatId);
    this.io.emit(SocketResponse.ALL_USERS, users);
  }
}

export default SocketRouter;
