import axios from 'axios';
import Post from "../types/post.type";

async function getAllPosts() {
  const result = await axios.get('http://localhost:4000/posts');
  return result.data as Post[];
}

function addNewPost(post: Post) {
  axios.post('http://localhost:4000/post/create', post);
}

function removePost(post: Post) {
  axios.get(`http://localhost:4000/post/delete/${post.id}`);
}

export {
  getAllPosts,
  addNewPost,
  removePost,
};
