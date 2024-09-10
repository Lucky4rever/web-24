import { html } from "lit";
import Post from "../types/post.type";
import { removePost } from "../utils/fetching";

const PostComponent = (post: Post) => {
  return html`
    <div class="form-box list-box">
      <span class="form-left-side">
        <label class="list-label">${post.title}</label>
        <label for="">${post.article}</label>
        <label for="">${post.date}</label>
      </span>
      <span class="form-right-side">
        <button 
          class="button icon-box"
          @click=${() => removePost(post)}
        >
          <img
            class="icons"
            src="images/rubbish-bin-svgrepo-com.svg"
            alt=""
          />
        </button>
        <label>${post.author}</label>
      </span>
    </div>
  `;
};

export default PostComponent;
