import { v4 as uuidv4 } from 'uuid';

type Post = {
  id: ReturnType<typeof uuidv4>,
  title: string;
  article: string;
  author: string;
  date: Date;
};

export default Post;
