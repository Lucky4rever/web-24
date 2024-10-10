import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI не знайдено в .env файлі');
}

export default () => connect(uri)
  .then(() => {
    console.log('З\'єднання з MongoDB успішно встановлено');
  })
  .catch((error) => {
    console.error('Помилка під час з\'єднання з MongoDB:', error);
  });;