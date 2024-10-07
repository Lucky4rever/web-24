import { LocalStorage } from 'node-localstorage';
import { User } from "../models";

class UsersDatabase {
  private localStorage = new LocalStorage('./storage');

  public addUser(user: User): void {
    this.localStorage.setItem('users', JSON.stringify([...this.getUsers(), user]));
  };

  public getUserById(id: string): User | undefined {
    return this.getUsers().find(({ id: userId }) => userId === id);
  }

  public getUsers(): User[] {
    const usersData = this.localStorage.getItem('users');
    return usersData ? JSON.parse(usersData) : [];
  };
}

export default new UsersDatabase();
