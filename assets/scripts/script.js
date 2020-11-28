const Book = (title, author, rating, status) => {
    let bookObject = Object.assign(Object.create(protoBook), {
        title, author, rating, status
    }); 

    return bookObject;
}

const protoBook = {
    opositeStatus: function() {
        if (this.status == 'read') return 'unread';
        return 'read';
    }
}

const library = (bookArray) => {
     let libraryObj = Object.assign(Object.create(protoLibrary()), {
        bookArray
    });

    return libraryObj;
} 


protoLibrary = () => {

    // private 

    function retrieveStorage() {
        if(!localStorage.getItem('myLibrary')) bookArray = [];
        bookArray = JSON.parse(localStorage.getItem('myLibrary'));
        for (let i = 0; i < bookArray.length; i++) {
            let book = bookArray[i];
            bookArray[i] = Book(book.title, book.author, book.rating, book.status); 
        }
    } 
    
    const saveLibrary = () => {
        localStorage.setItem('myLibrary', JSON.stringify(bookArray));
    }

    function readStatus(container, book) {
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
            displayBooks();
            saveLibrary();
        })
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
            saveLibrary();
        })
    }

    function createBookTag(attribute, container, book) {
        const element = document.createElement('div');
        element.innerHTML = `<span>${attribute}: </span> ${book[attribute]}`;
        container.appendChild(element);
    }

    // public 

    function displayBooks() {

        const main_container = document.querySelector('.books');
        
        while(main_container.firstChild){
            main_container.removeChild(main_container.firstChild);
        }
    
        for (let i = 0; i < bookArray.length; i++) {
            const bookAttributes = ['title', 'author', 'rating', 'status'];
            const container = document.createElement('div');
            container.classList.add('book-card');
            main_container.appendChild(container);
            
            bookAttributes.forEach((tagClass) => {
                createBookTag(tagClass, container, bookArray[i]);
            });
            
            buildRemoveButton(container, main_container, bookArray[i]);
            readStatus(container, bookArray[i], bookArray);
        }
        
    }

    const addBook = (ev)=>{
        ev.preventDefault(); // to stop the form submitting 
        let book = Book();
        book.title = document.getElementById('title').value;
        book.author = document.getElementById('author').value;
        book.rating = document.getElementById('rating').value;
        book.status = document.getElementById('status').value;
    
        bookArray.push(book);
        document.querySelector('form').reset();
        
        displayBooks();
        saveLibrary();
    }

    return {
        addBook,
        displayBooks,
        retrieveStorage
    }

    
}

let firstLibrary = [];
const myLibrary = library(firstLibrary);

myLibrary.retrieveStorage();
myLibrary.displayBooks();

const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', myLibrary.addBook);

