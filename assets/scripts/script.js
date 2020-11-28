
const protoBook = {
    opositeStatus: function() {
        if (this.status == 'read') return 'unread';
        return 'read';
    }
}
const Book = (title, author, rating, status) => {
    let bookObject = Object.assign(Object.create(protoBook), {
        title, author, rating, status
    }); 

    return bookObject;
 
}

const library = (bookArray) => {
    //const bookArray = retrieveStorage(JSON.parse(localStorage.getItem('myLibrary')));
    
    let libraryObj = Object.assign(Object.create(protoLibrary()), {
        bookArray
    });

    return libraryObj;
} 


protoLibrary = () => {

    // private 
    console.log(bookArray)
    console.log('chamo');
    
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
            displayBooks();
           // saveLibrary(library);
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
            // saveLibrary(bookArray);
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
            const container = document.createElement('div');
            container.classList.add('book-card');
            main_container.appendChild(container);
            createBookTag('title', container, bookArray[i]);
            createBookTag('author', container, bookArray[i]);
            createBookTag('rating', container, bookArray[i]);
            createBookTag('status', container, bookArray[i]);
        
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
        // saveLibrary(bookArray);
    }

    return {
        addBook,
        displayBooks
    }

    
}


/* function retrieveStorage(array) {
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
*/

const submitButton = document.getElementById('submit');


let bookArray = [];

let myLibrary = library(bookArray);
console.log(myLibrary);
myLibrary.displayBooks();


submitButton.addEventListener('click', myLibrary.addBook);

