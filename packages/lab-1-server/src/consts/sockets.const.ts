const SocketRequest = {
  CONNECT: 'connection',
  DISCONNECT: 'disconnect',
  GET_ALL_MESSAGES: 'get:messages',
  ADD_MESSAGE: 'add:message',
  GET_ALL_USERS: 'get:users',
  ADD_USER: 'add:user',
  REMOVE_USER: 'remove:user',
} as const;

const SocketResponse = {
  ALL_USERS: 'all:users',
  ALL_MESSAGES: 'all:messages',
  CHAT_INFO: 'info',
  NEW_MESSAGE: 'new:message',
  USER_JOINED: 'user:joined',
} as const;

export {
  SocketRequest,
  SocketResponse,
};