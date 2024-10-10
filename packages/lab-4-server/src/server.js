import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import connect from './database/connect.js';
import { AppRouter } from './routes/index.js';
// import postController from './controllers/post.controller.js';

const app = express();
const router = new AppRouter(app);

await connect();

app.set('port', process.env.PORT || 4000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

router.init();

// app.get('/post/:id', postController.getPostById.bind(postController));
// app.get('/posts', postController.getAllPosts.bind(postController));
// app.post('/post/create', postController.createPost.bind(postController));
// app.post('/post/update/:id', postController.updatePost.bind(postController));
// app.get('/post/delete/:id', postController.deletePost.bind(postController));

const port = app.get('port');
// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export default server;
