const firstLibrary = [];
const myLibrary = new Library(firstLibrary);

myLibrary.retrieveStorage();
myLibrary.displayBooks();

const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', () => {
  myLibrary.addBook();
});
