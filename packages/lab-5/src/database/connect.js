import { connect } from 'mongoose';

const uri = "mongodb+srv://ilovepolsha:JpkRb6UNubWUTaiJ@kpibackendlab5.d4qdufm.mongodb.net/Lab5?retryWrites=true&w=majority&appName=KPIBackendLab5";

export default () => connect(uri)
  .then(() => {
    console.log('З\'єднання з MongoDB успішно встановлено');
  })
  .catch((error) => {
    console.error('Помилка під час з\'єднання з MongoDB:', error);
  });;