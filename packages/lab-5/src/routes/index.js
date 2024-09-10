import postRouter from './post.route.js';
import graphqlRouter from './graphql.route.js';
import { APP_ROUTES } from '../consts/routes.const.js';

export class AppRouter {
  constructor(app) {
    this.app = app;
  }

  init() {
    this.app.get('/', (_req, res) => {
      res.send('This is a Personal Blog API!');
    });
    this.app.use(APP_ROUTES.ALL_POSTS, postRouter);
    this.app.use(APP_ROUTES.POST, postRouter);
    this.app.use(APP_ROUTES.GRAPHQL, graphqlRouter);
  }
}