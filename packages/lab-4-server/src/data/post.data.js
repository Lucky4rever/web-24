import { v4 as uuidv4 } from 'uuid';
import { Post } from '../entities/index.js';

function generateRandomEntities(size = 10) {
  const entities = [];

  for (let i = 0; i < size; i++) {
    const id = uuidv4();
    const title = `Title ${i + 1}`;
    const description = `Description ${i + 1}`;
    const author = `Author ${i + 1}`;
    const date = new Date();
    
    entities.push(new Post({ id, title, description, author, date }));
  }

  return entities;
}

const data = generateRandomEntities(10);

export { data };
