const protoBook = {
  opositeStatus() {
    if (this.status === 'read') return 'unread';
    return 'read';
  },
};

const Book = (title, author, rating, status) => {
  const bookObject = Object.assign(Object.create(protoBook), {
    title, author, rating, status,
  });

  return bookObject;
};

const protoLibrary = () => {
  let { bookArray } = this;

  function retrieveStorage() {
    if (!localStorage.getItem('myLibrary')) bookArray = [];
    bookArray = JSON.parse(localStorage.getItem('myLibrary'));
    for (let i = 0; i < bookArray.length; i += 1) {
      const book = bookArray[i];
      bookArray[i] = Book(book.title, book.author, book.rating, book.status);
    }
  }

  const saveLibrary = () => {
    localStorage.setItem('myLibrary', JSON.stringify(bookArray));
  };

  function readStatus(container, book) {
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
      saveLibrary();
    });
  }


  const buildRemoveButton = (container, mainContainer, book) => {
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-book');
    container.appendChild(removeButton);
    removeButton.innerHTML = "<span class='remove-x' >&times;</span>";

    removeButton.addEventListener('click', () => {
      mainContainer.removeChild(container);
      const index = bookArray.indexOf(book);
      bookArray.splice(index, 1);
      saveLibrary();
    });
  };


  function createBookTag(attribute, container, bookIndex) {
    const book = bookArray[bookIndex];
    const element = document.createElement('div');
    element.classList.add(attribute);
    element.innerHTML = `<span>${attribute}: </span> ${book[attribute]}`;
    container.appendChild(element);
  }

  function displayBooks() {
    const mainContainer = document.querySelector('.books');

    while (mainContainer.firstChild) {
      mainContainer.removeChild(mainContainer.firstChild);
    }

    for (let i = 0; i < bookArray.length; i += 1) {
      const bookAttributes = ['title', 'author', 'rating', 'status'];
      const container = document.createElement('div');
      container.classList.add('book-card');
      mainContainer.appendChild(container);

      bookAttributes.forEach((tagClass) => {
        createBookTag(tagClass, container, i);
      });

      buildRemoveButton(container, mainContainer, bookArray[i]);
      readStatus(container, bookArray[i]);
    }
  }

  const addBook = (ev) => {
    ev.preventDefault(); // to stop the form submitting
    const book = Book();
    book.title = document.getElementById('title').value;
    book.author = document.getElementById('author').value;
    book.rating = document.getElementById('rating').value;
    book.status = document.getElementById('status').value;

    bookArray.push(book);
    document.querySelector('form').reset();

    displayBooks();
    saveLibrary();
  };

  return {
    addBook,
    displayBooks,
    retrieveStorage,
  };
};

const library = (bookArray) => {
  const libraryObj = Object.assign(Object.create(protoLibrary()), {
    bookArray,
  });

  return libraryObj;
};

const firstLibrary = [];
const myLibrary = library(firstLibrary);

myLibrary.retrieveStorage();
myLibrary.displayBooks();

const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', myLibrary.addBook);
