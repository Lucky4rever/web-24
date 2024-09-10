import { buildSchema } from 'graphql';
import { PostModel } from '../models/post.model.js';

const schema = buildSchema(`
  type Post {
    id: ID!
    title: String!
    article: String!
    author: String!
    date: String
  }

  type Query {
    getPostById(id: ID!): Post
    getAllPosts: [Post]
  }

  type Mutation {
    createPost(id: ID!, title: String!, article: String!, author: String!): Post
    updatePost(id: ID!, title: String, article: String, author: String): Post
    deletePost(id: ID!): Post
  }
`);

// Визначення резолверів
const resolver = {
  getPostById: async ({ id }) => {
    try {
      const post = await PostModel.findOne({ id: id });
      return post;
    } catch (error) {
      throw new Error('Error fetching post by ID');
    }
  },
  getAllPosts: async () => {
    try {
      const posts = await PostModel.find();
      return posts;
    } catch (error) {
      throw new Error('Error fetching all posts');
    }
  },
  createPost: async ({ id, title, article, author }) => {
    try {
      const newPost = new PostModel({ id, title, article, author });
      return await newPost.save();
    } catch (error) {
      throw new Error('Error creating post');
    }
  },
  updatePost: async ({ id, title, article, author }) => {
    try {
      return await PostModel.findOneAndUpdate(
        { id: id },
        { title, article, author },
        { new: true }
      );
    } catch (error) {
      throw new Error('Error updating post');
    }
  },
  deletePost: async ({ id }) => {
    try {
      return await PostModel.findOneAndDelete({ id: id });
    } catch (error) {
      throw new Error('Error deleting post');
    }
  }
};

export { schema, resolver };
