import { Route } from "./route-stack";

const routes: Route[] = [
  {
    id: 'home',
    title: 'Home',
    description: 'Вітаю! Оберіть команду:',
    routeOptions: {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Студент', callback_data: 'student_info' }],
          [{ text: 'IT-технології', callback_data: 'tech_info' }],
          [{ text: 'Контакти', callback_data: 'contacts_info' }],
          [{ text: 'Поговорити з AI', callback_data: 'ai_chat' }]
        ],
      },
    },
  },
  {
    id: 'student_info',
    title: 'Student Info',
    description: 'Студент Снігур П. В., група ІС-12',
    routeOptions: {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Назад', callback_data: 'back' }],
        ],
      },
    },
  },
  {
    id: 'tech_info',
    title: 'Tech Info',
    description: 'IT-технології: frontend, backend',
    routeOptions: {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Назад', callback_data: 'back' }],
        ],
      },
    },
  },
  {
    id: 'contacts_info',
    title: 'Contacts Info',
    description: 'Контакти: Телефон: +380123456789, Email: snigur.pavlo@lll.kpi.ua',
    routeOptions: {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Назад', callback_data: 'back' }],
        ],
      },
    },
  },
  {
    id: 'ai_chat',
    title: 'AI Chat',
    description: 'Тепер ви розмовляєте із llama3:',
    routeOptions: {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Назад', callback_data: 'back' }],
        ],
      },
    },
  },
];

export {
  routes,
};
