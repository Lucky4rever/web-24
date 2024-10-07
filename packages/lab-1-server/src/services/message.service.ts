import ChatsDatabase from '../db/chats.db';
import { Message } from '../models';

class MessageService {
  private chatId: string;

  constructor(chatId: string) {
    const chat = ChatsDatabase.getChatById(chatId);
    
    if (!chat) {
      throw new Error(`Chat with id ${chatId} not found`);
    }

    this.chatId = chatId;
  }
  
  getMessages() {
    return ChatsDatabase.getMessagesFromChat(this.chatId);
  }

  addMessage(message: Message) {
    ChatsDatabase.addMessageToChat(this.chatId, message);
  }

  currentChatId() {
    return this.chatId;
  }
}

export default MessageService;
