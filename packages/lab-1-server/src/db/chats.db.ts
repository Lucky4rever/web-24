import { LocalStorage } from 'node-localstorage';
import { Chat, Message, User } from "../models";

class ChatsDatabase {
  private localStorage = new LocalStorage('./storage/chats');

  public addChat(chat: Chat): void {
    this.localStorage.setItem(chat.id, JSON.stringify(chat));
  };

  public getChatById(id: string): Chat | undefined {
    return this.localStorage.getItem(id) ? JSON.parse(this.localStorage.getItem(id) as string) : undefined;
  }

  public getChats(): Chat[] {
    const chats: Chat[] = [];
    for (let i = 0; i < this.localStorage.length; i++) {
      const key = this.localStorage.key(i);
      if (key) {
        const chat = this.getChatById(key);
        if (chat) {
          chats.push(chat);
        }
      }
    }
    return chats;
  }

  public removeChat(id: string) {
    this.localStorage.removeItem(id);
  }

  public addUserToChat(chatId: string, user: User): void {
    const chat = this.getChatById(chatId);
    if (!chat) return;

    chat.users.push(user);
    this.addChat(chat);
  }

  public addMessageToChat(chatId: string, message: Message): void {
    const chat = this.getChatById(chatId);
    if (!chat) return;

    chat.messages.push(message);
    this.addChat(chat);
  }

  public getMessagesFromChat(chatId: string): Message[] {
    const chat = this.getChatById(chatId);
    return chat ? chat.messages : [];
  }
}

export default new ChatsDatabase();
