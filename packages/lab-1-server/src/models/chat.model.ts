import { MessageModel } from "./message.model";
import { UserModel } from "./user.model";

export type ChatModel = {
  id: string;
  name: string;
  messages: MessageModel[];
  users: UserModel[];
};
