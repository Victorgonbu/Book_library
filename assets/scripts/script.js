let myLibrary = [];

function Book(title, author, rating, status) {
    this.title = title;
    this.author = author;
    this.rating = rating;
    this.status = status;
}

function createBookTag(attribute, container, book) {
    const element = document.createElement('div');
    element.innerHTML = `<span>${attribute}: </span> ${book[attribute]}`;
    container.appendChild(element);
}

function buildRemoveButton(container, main_container) {
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-book');
    container.appendChild(removeButton);
    removeButton.innerHTML = "<span class='remove-x' >&times;</span>";

    removeButton.addEventListener('click', () => {
        main_container.removeChild(container);
    })
}

function readStatus(container, book) {
    const read = document.createElement('div');
    read.classList.add('read-status');
    read.innerHTML = `<span> Status: </span> ${book.status}`;
    container.appendChild(read);
    read.addEventListener('click', () => {
        if (book.status == 'read') {
            book.status = 'unread'
        }else {
            book.status = 'read'
        }
        read.innerHTML = `<span> Status: </span> ${book.status}`;
    })
}


function display_books(book) {
    
    const main_container = document.querySelector('.books');

    const container = document.createElement('div');
    container.classList.add('book-card');
    main_container.appendChild(container);
    createBookTag('title', container, book);
    createBookTag('author', container, book);
    createBookTag('rating', container, book);
    buildRemoveButton(container, main_container);
    readStatus(container, book);
}

function removeBook(array, element) {
    const index = array.indexOf(element);
  
    if (index !== -1) {
      array.splice(index, 1);
    }
}



/* submit fields filled out */

const addBook = (ev)=>{
    ev.preventDefault(); // to stop the form submitting
    let book = new Book();
  
    book.title = document.getElementById('title').value;
    book.author = document.getElementById('author').value;
    book.rating = document.getElementById('rating').value;
    book.status = document.getElementById('status').value;

    myLibrary.push(book);
    document.querySelector('form').reset();

    console.warn('added', {myLibrary} );

    display_books(book);    
}

const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', addBook);



