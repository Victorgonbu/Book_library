let myLibrary = [];

function Book(title, release, rate) {
    this.title = title;
    this.release = release;
    this.rate = rate;

}

function createBookTag(span, container, book) {
    const element = document.createElement('div');
    const label = document.createElement('span');
    label.textContent = span + ':';
    container.appendChild(label);

    if (span == 'title') {
        
        element.textContent = book.title;

    } else if(span == 'release') {
        element.textContent = book.release;
    } else {
        element.textContent = book.rate;
    }

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

function readStatus(container) {
    const read = document.createElement('div');
    read.classList.add('read-status');
    read.innerHTML = "<span> Status: </span> Unread"
    container.appendChild(read);
    read.addEventListener('click', () => {
        read.classList.toggle('read-book')
    })
}


function display_books(book) {
    
    const main_container = document.querySelector('.books');

    const container = document.createElement('div');
    container.classList.add('book-card');
    main_container.appendChild(container);
    createBookTag('title', container, book);
    createBookTag('release', container, book);
    createBookTag('rate', container, book); 
    buildRemoveButton(container, main_container);
    readStatus(container);
}

function removeBook(array, element) {
    const index = array.indexOf(element);
  
    if (index !== -1) {
      array.splice(index, 1);
    }
}

/* ADD BOOK POP UP */

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');

const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    })
})

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

/* submit fields filled out */

const addBook = (ev)=>{
    ev.preventDefault(); // to stop the form submitting
    let book = new Book();
  
    book.title = document.getElementById('title').value;
    book.release = document.getElementById('release').value;
    book.rate = document.getElementById('rate').value;

    myLibrary.push(book);
    document.querySelector('form').reset();

    console.warn('added', {myLibrary} );

    display_books(book);
}

const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', addBook);



