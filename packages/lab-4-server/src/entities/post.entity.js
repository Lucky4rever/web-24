export class PostEntity {
  constructor({ id, title, article, author, date }) {
    this.id = id;
    this.title = title;
    this.article = article;
    this.author = author;
    this.date = date;
  }

  toString() {
    return `PostEntity: { id: ${this.id}, title: ${this.title}, article: ${this.article}, author: ${this.author}, date: ${this.date} }`;
  }
}
