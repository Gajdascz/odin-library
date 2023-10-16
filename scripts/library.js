// DOM Element Selectors
const addBookButton = document.querySelector(`.add-book-button`);
const addBookDialog = document.querySelector(`#add-book-dialog`);
const addBookForm = document.querySelector(`#add-book-form`);
const closeBookFormButton = document.querySelector(`#close-button`);
addBookButton.addEventListener(`click`, (e) => {
  addBookDialog.showModal();
});



// Variable Definitions
const myLibrary = [];
const sampleLibrary = []

// Constructors
function Book(title, author, pages, read, ) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
}
// Functions
function addBookToLibrary() {
  myLibrary.forEach(book => {
    console.log(book);
  });
}

// Listeners
closeBookFormButton.addEventListener(`click`, (e) => {
  addBookDialog.close();
});

addBookDialog.addEventListener(`submit`, () => {
  let title = document.querySelector(`input#book-title`).value;
  let author = document.querySelector(`input#book-author`).value;
  let pages = document.querySelector(`input#book-pages`).value;
  let read = () => document.querySelector(`#book-read`).checked ? true : false;
  myLibrary.push(new Book(title, author, pages, read));
  addBookToLibrary();
  addBookForm.reset();
});