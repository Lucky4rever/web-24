type User = {
  id: string;
  username: string;
  room: string;
};

let usersInRooms: Map<string, User[]> = new Map();

export { 
  User, 
  usersInRooms 
};
