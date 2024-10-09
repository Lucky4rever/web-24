import TelegramBot, { CallbackQuery } from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { Route, RouteStack } from './route-stack';
import { routes } from './routes';
import useGroq from './use-groq';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  throw new Error('Telegram bot token was not provided');
}

const bot = new TelegramBot(token, {polling: true});
const routeStack = RouteStack();

bot.onText(/\/start/, (msg, _) => {
  const chatId = msg.chat.id;

  const route = routes[0];

  routeStack.clearStack();
  routeStack.addRoute(route);

  console.log(`Switched to the route ${route.title}`);
  bot.sendMessage(chatId, route.description, route.routeOptions);
});

bot.on('message', async (msg) => {
  if (routeStack.getCurrentRoute()?.id !== 'ai_chat') return;

  const chatId = msg.chat.id;
  const message = msg.text;

  if (!message) return;

  const response = await useGroq(message);

  bot.sendMessage(chatId, response || 'No response');
});


bot.on('callback_query', (query: CallbackQuery) => {
  const chatId = query.message?.chat.id;

  if (!chatId) return;

  const sendMessageCallback = (route: Route | null | undefined) => {
    if (!route) return;

    routeStack.addRoute(route);
    console.log(`Switched to the route ${route.title}`);
    
    bot.editMessageText(route.description, {
      chat_id: chatId,
      message_id: query.message?.message_id,
      reply_markup: route.routeOptions?.reply_markup,
    });
  };

  switch (query.data) {
    case 'back': {
      const route = routeStack.goBack();
      sendMessageCallback(route);
 
      break;
    };
    default: {
      const route = routes.find(route => route.id === query.data);
      sendMessageCallback(route);

      break;
    };
  }
});

console.log('Telegram bot is running');
