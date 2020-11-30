class Book {
  constructor(title, author, rating, status) {
    this.title = title;
    this.author = author;
    this.rating = rating;
    this.status = status;
  }

  opositeStatus() {
    if (this.status === 'read') return 'unread';
    return 'read';
  }
}