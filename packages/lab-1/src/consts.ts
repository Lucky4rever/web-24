const SocketRequest = {
	CONNECTION: 'connection',
	DISCONNECT: 'disconnect',
	JOIN_ROOM: 'join room',
	MESSAGE: 'message',
} as const;

const SocketResponse = {
	CHAT_MESSAGE: 'chat message',
	SYSTEM_MESSAGE: 'system message',
	USER_JOINED: 'user joined',
	USER_LEFT: 'user left',
} as const;

export { SocketRequest, SocketResponse };
