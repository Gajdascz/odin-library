// DOM Elements and Listeners
const addBookButton = document.querySelector(`.add-book-button`);
const addBookDialog = document.querySelector(`#add-book-dialog`);
const closeBookFormButton = document.querySelector(`#close-button`);
addBookButton.addEventListener(`click`, (e) => {
  addBookDialog.showModal();
});

closeBookFormButton.addEventListener(`click`, (e) => {
  addBookDialog.close();
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

}
