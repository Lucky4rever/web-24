import PostService from '../services/post.service.js';

export class PostController {
  constructor(postService) {
    this.postService = postService;
  }

  async getAllPosts(_, res) {
    try {
      const result = await this.postService.getAllPosts();
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getPostById(req, res) {
    const id = req.params.id;

    try {
      const result = await this.postService.getPostById(id);
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async createPost(req, res) {
    const postData = req.body;

    try {
      const result = await this.postService.createPost(postData);
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updatePost(req, res) {
    const id = req.params.id;
    const newData = req.body;

    try {
      const result = await this.postService.updatePost(id, newData);
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async deletePost(req, res) {
    const id = req.params.id;

    try {
      const result = await this.postService.deletePost(id);
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

const postController = new PostController(new PostService());
export default postController;