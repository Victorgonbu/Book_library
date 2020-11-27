
const bookArray = retrieveStorage(JSON.parse(localStorage.getItem('myLibrary')));

function Book(title, author, rating, status) {
    this.title = title;
    this.author = author;
    this.rating = rating;
    this.status = status;
}

Book.prototype.opositeStatus = function() {
    
    if (this.status == 'read') {
        return 'unread';
    }else {
        return 'read';
    }
}

function retrieveStorage(array) {
    let bookArray = [];
    if (array) { 
    
    for(let i = 0; i < array.length; i++) {
        let book = new Book();
        book.title = array[i].title;
        book.author = array[i].author;
        book.status = array[i].status;
        book.rating = array[i].rating;
        bookArray.push(book);
    }
    return bookArray;
    }else {
        return bookArray = [];
    }
   
}

const saveLibrary = (array) => {
    localStorage.setItem('myLibrary', JSON.stringify(array));
}


function createBookTag(attribute, container, book) {
    const element = document.createElement('div');
    element.innerHTML = `<span>${attribute}: </span> ${book[attribute]}`;
    container.appendChild(element);
}

const buildRemoveButton = (container, main_container, book) => {
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-book');
    container.appendChild(removeButton);
    removeButton.innerHTML = "<span class='remove-x' >&times;</span>";

    removeButton.addEventListener('click', () => {
        main_container.removeChild(container);
        let index = bookArray.indexOf(book);
        bookArray.splice(index, 1);
        saveLibrary(bookArray);
    })
}

function readStatus(container, book, library) {
    const read = document.createElement('div');
    read.classList.add('read-status');

    read.innerHTML = `Mark as ${book.opositeStatus()}`;
    container.appendChild(read);
    read.addEventListener('click', () => {
        if (book.status == 'read') {
            book.status = 'unread'
        }else {
            book.status = 'read'
        }
        read.innerHTML = `Mark as ${book.opositeStatus()}`;
        display_books(library);
        saveLibrary(library);
    })
}


function display_books(library) {

    const main_container = document.querySelector('.books');
    
    while(main_container.firstChild){
        main_container.removeChild(main_container.firstChild);
    }

    for (let i = 0; i < library.length; i++) {
        const container = document.createElement('div');
        container.classList.add('book-card');
        main_container.appendChild(container);
        createBookTag('title', container, library[i]);
        createBookTag('author', container, library[i]);
        createBookTag('rating', container, library[i]);
        createBookTag('status', container, library[i]);
    
        buildRemoveButton(container, main_container, library[i]);
        readStatus(container, library[i], library);
    }
    
}

function removeBook(array, element) {
    const index = array.indexOf(element);
  
    if (index !== -1) {
      array.splice(index, 1);
    }
}

const addBook = (ev)=>{
    ev.preventDefault(); // to stop the form submitting 
    let book = new Book();
    book.title = document.getElementById('title').value;
    book.author = document.getElementById('author').value;
    book.rating = document.getElementById('rating').value;
    book.status = document.getElementById('status').value;

    bookArray.push(book);
    document.querySelector('form').reset();
    
    display_books(bookArray);
    saveLibrary(bookArray);
  
}

const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', addBook);


display_books(bookArray);    


