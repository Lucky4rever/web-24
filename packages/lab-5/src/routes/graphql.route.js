import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { resolver, schema } from '../graphql/post.resolver.js';

const graphqlRouter = Router();

graphqlRouter.use('/', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true,
}));

export default graphqlRouter;
