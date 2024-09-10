import { Post } from '../models/index.js';

export default class PostService {
  async getPostById(id) {
    return await Post.findOne({ id: id });
  }

  async createPost(postData) {
    return await Post.create(postData);
  }

  async updatePost(id, newData) {
    return await Post.findOneAndUpdate({ id: id }, newData);
  }

  async deletePost(id) {
    return await Post.findOneAndDelete({ id: id });
  }

  async getAllPosts() {
    return await Post.find();
  }
}
