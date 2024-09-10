import { Router } from 'express';

import postController from '../controllers/post.controller.js';

const postRouter = Router();

postRouter.get('/:id', postController.getPostById.bind(postController));
postRouter.get('/', postController.getAllPosts.bind(postController));
postRouter.post('/create', postController.createPost.bind(postController));
postRouter.post('/update/:id', postController.updatePost.bind(postController));
postRouter.get('/delete/:id', postController.deletePost.bind(postController));

export default postRouter;
