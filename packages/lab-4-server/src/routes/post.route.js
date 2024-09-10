import { Router } from 'express';

import postController from '../controllers/post.controller.js';

const postRouter = Router();

postRouter.get('/post/:id', postController.getPostById.bind(postController));
postRouter.get('/posts', postController.getAllPosts.bind(postController));
postRouter.get('/post/create', postController.createPost.bind(postController));
postRouter.get('/post/delete', postController.deletePost.bind(postController));
postRouter.get('/post/update/:id', postController.updatePost.bind(postController));

export default postRouter;
