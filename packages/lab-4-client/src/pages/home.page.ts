import { html, render } from 'lit';

const HomePage = (app: HTMLElement) => {
  const document = html`
    <section>
      <div class="container">
        <h1 class="main-heading">PERSONAL BLOG</h1>
        <p>Build with Node.js Express</p>
      </div>
    </section>
  `;

  return render(document, app);
};

export default HomePage;
