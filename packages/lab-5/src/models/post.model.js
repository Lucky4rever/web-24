import { model, Schema } from 'mongoose';

const postSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  article: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const PostModel = model('Post', postSchema);

export { PostModel };
