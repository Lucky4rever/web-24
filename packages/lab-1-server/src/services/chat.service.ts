import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { Chat, User, Message } from '../models';
import { firestore } from '../db/connection';

class ChatService {
  private chatCollection = collection(firestore, 'chats');

  async createChat(chat: Chat): Promise<void> {
    await addDoc(this.chatCollection, chat);
  }

  async getChats(): Promise<Chat[]> {
    const chatSnapshot = await getDocs(this.chatCollection);
    return chatSnapshot.docs.map(doc => doc.data() as Chat);
  }

  async updateChat(chatId: string, updatedChat: Partial<Chat>): Promise<void> {
    const chatDoc = doc(this.chatCollection, chatId);
    await updateDoc(chatDoc, updatedChat);
  }

  async deleteChat(chatId: string): Promise<void> {
    const chatDoc = doc(this.chatCollection, chatId);
    await deleteDoc(chatDoc);
  }

  async addUserToChat(chatId: string, user: User): Promise<void> {
    const chatDoc = doc(this.chatCollection, chatId);
    const chatData = (await getDoc(chatDoc)).data() as Chat;
    chatData.users.push(user);
    await updateDoc(chatDoc, { users: chatData.users });
  }

  async addMessageToChat(chatId: string, message: Message): Promise<void> {
    const chatDoc = doc(this.chatCollection, chatId);
    const chatData = (await getDoc(chatDoc)).data() as Chat;
    chatData.messages.push(message);
    await updateDoc(chatDoc, { messages: chatData.messages });
  }

  async removeUserFromChat(chatId: string, userId: string): Promise<void> {
    const chatDoc = doc(this.chatCollection, chatId);
    const chatData = (await getDoc(chatDoc)).data() as Chat;
    chatData.users = chatData.users.filter(user => user.id !== userId);
    await updateDoc(chatDoc, { users: chatData.users });
  }

  async getChatUsers(chatId: string): Promise<User[]> {
    const chatDoc = doc(this.chatCollection, chatId);
    const chatData = (await getDoc(chatDoc)).data() as Chat | undefined;
    if (!chatData) {
      return [];
    }
    return chatData.users;
  }

  async getChatMessages(chatId: string): Promise<Message[]> {
    const chatDoc = doc(this.chatCollection, chatId);
    const chatData = (await getDoc(chatDoc)).data() as Chat | undefined;
    if (!chatData) {
      return [];
    }
    return chatData.messages;
  }
}

export default ChatService;
