// Class
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

class Library {
  constructor(bookArray) {
    this.bookArray = bookArray;
  }

  retrieveStorage() {
    if (localStorage.getItem('myLibrary')) {
      this.bookArray = JSON.parse(localStorage.getItem('myLibrary'));
      for (let i = 0; i < this.bookArray.length; i += 1) {
        const book = this.bookArray[i];
        this.bookArray[i] = new Book(book.title, book.author, book.rating, book.status);
      }
    }
  }

  saveLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(this.bookArray));
  }
  
  readStatus(container, book) {
    const read = document.createElement('div');
    const readStatus = container.querySelector('.status');
    read.classList.add('read-status');

    read.innerHTML = `Mark as ${book.opositeStatus()}`;
    container.appendChild(read);
    read.addEventListener('click', () => {
      if (book.status === 'read') {
        book.status = 'unread';
      } else {
        book.status = 'read';
      }
      readStatus.innerHTML = `<span>Status: </span> ${book.status}`;
      read.innerHTML = `Mark as ${book.opositeStatus()}`;
      this.saveLibrary();
    });
  }


  buildRemoveButton(container, mainContainer, book) {
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-book');
    container.appendChild(removeButton);
    removeButton.innerHTML = "<span class='remove-x' >&times;</span>";

    removeButton.addEventListener('click', () => {
      mainContainer.removeChild(container);
      const index = this.bookArray.indexOf(book);
      this.bookArray.splice(index, 1);
      this.saveLibrary();
    });
  }


  createBookTag(attribute, container, bookIndex) {
    const book = this.bookArray[bookIndex];
    const element = document.createElement('div');
    element.classList.add(attribute);
    element.innerHTML = `<span>${attribute}: </span> ${book[attribute]}`;
    container.appendChild(element);
  }

  displayBooks() {
    const mainContainer = document.querySelector('.books');

    while (mainContainer.firstChild) {
      mainContainer.removeChild(mainContainer.firstChild);
    }

    for (let i = 0; i < this.bookArray.length; i += 1) {
      const bookAttributes = ['title', 'author', 'rating', 'status'];
      const container = document.createElement('div');
      container.classList.add('book-card');
      mainContainer.appendChild(container);

      bookAttributes.forEach((tagClass) => {
        this.createBookTag(tagClass, container, i);
      });

      this.buildRemoveButton(container, mainContainer, this.bookArray[i]);
      this.readStatus(container, this.bookArray[i]);
    }
  }

  addBook() {
    const book = new Book();
    book.title = document.getElementById('title').value;
    book.author = document.getElementById('author').value;
    book.rating = document.getElementById('rating').value;
    book.status = document.getElementById('status').value;
    console.log(this.bookArray);
    this.bookArray.push(book);
    document.querySelector('form').reset();

    this.displayBooks();
    this.saveLibrary();
  }

}

let firstLibrary = [];
const myLibrary = new Library(firstLibrary);

myLibrary.retrieveStorage();
myLibrary.displayBooks();

const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', () => {
  myLibrary.addBook()
});
