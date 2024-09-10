import { v4 as uuidv4 } from 'uuid';
import { html, render } from 'lit';
import { addNewPost } from '../utils/fetching';

const AddPostPage = (app: HTMLElement) => {
  let title = '';
  let article = '';
  let author = '';

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    
    const newPost = {
      id: uuidv4(),
      title: title,
      article: article,
      author: author,
      date: new Date()
    };

    // Викликаємо функцію для посту нового посту
    addNewPost(newPost);
  };

  const document = html`
    <section>
      <form @submit=${handleSubmit}>
        <div class="form-box add-page-box">
          <label>Post title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            .value=${title} 
            @input=${(e: InputEvent) => (title = (e.target as HTMLInputElement).value)}
          ><br>
          
          <label>Author</label>
          <input 
            type="text" 
            id="author" 
            name="author" 
            .value=${author} 
            @input=${(e: InputEvent) => (author = (e.target as HTMLInputElement).value)}
          ><br><br>
          
          <label>Post Text</label>
          <textarea 
            id="article" 
            name="article" 
            .value=${article} 
            @input=${(e: InputEvent) => (article = (e.target as HTMLInputElement).value)}
          ></textarea><br>
          
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </section>
  `;

  return render(document, app);
};

export default AddPostPage;
