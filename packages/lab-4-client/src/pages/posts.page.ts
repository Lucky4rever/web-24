import { html, render } from 'lit';
import PostComponent from '../components/post.component';
import { getAllPosts } from '../utils/fetching';

const PostsPage = (app: HTMLElement) => {
  const document = async () => html`
    <section>
      <h1 class="heading-list">POSTS:</h1>
      <main>
        <ul>
          ${(await getAllPosts()).map((post) => PostComponent(post))}
        </ul>
      </main>
    </section>
  `;

  return document().then((res) => render(res, app));
};

export default PostsPage;