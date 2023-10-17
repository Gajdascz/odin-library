// DOM Element Selectors
const addBookButton = document.querySelector(`.add-book-button`);
const addBookDialog = document.querySelector(`#add-book-dialog`);
const addBookForm = document.querySelector(`#add-book-form`);
const closeBookFormButton = document.querySelector(`#close-button`);
const bookCardContainer = document.querySelector(`.book-card-container`);
const cardEditButton = document.querySelectorAll(`.edit-card-button`);
const cardDeleteButton = document.querySelectorAll(`.delete-card-button`);

// Event bubbling to keep event listeners up to date with dynamically created DOM elements
// Add eventlistener to container and check for class classList.containers(btton);

bookCardContainer.addEventListener(`click`, (e) => {
  if(e.target.classList.contains(`edit-card-button`)) {
    let bookTitle = e.target.parentElement.parentElement.parentElement.querySelector(`.book-card-title`).textContent;
    checkLibraryArray(bookTitle);
  }
  if(e.target.classList.contains(`delete-card-button`)) {
    console.log(e.target);
  }
});


function checkLibraryArray(bookTitle) {
  myLibrary.forEach((Book, index) => {
    if(Book.title === bookTitle) {
      console.log(myLibrary[index]);
      return myLibrary[index];
    }
    else { return false; }
  });
}

// Variable Definitions
const myLibrary = [{"title": `A book on C`}, {"title": `The Bible`}];

// Constructors
function Book(title, author, pages, read, ) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
}
// Helper Functions
const displayBooks = () => {
  myLibrary.forEach(Book => {
    createBookCard(Book);
  });
}

function setAttributes(element, attributes) {
  for(attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
}
function createBookCard(Book) {
  // Create Dom Elements
  const articleElement = document.createElement(`article`);
  const cardHeaderDiv = document.createElement(`div`);
  const cardHeaderTitle = document.createElement(`h3`);
  const cardOptionsButton = document.createElement(`button`);
  const cardOptionsIconSvg = document.createElementNS(`http://www.w3.org/2000/svg`, `svg`);
  const cardOptionsIconPath = document.createElementNS(`http://www.w3.org/2000/svg`, `path`);
  const cardOptionsMenuContainer = document.createElement(`div`);
  const cardOptionsMenuContent = document.createElement(`div`);
  const cardEditButton = document.createElement(`button`);
  const cardDeleteButton = document.createElement(`button`);
  const cardInformationContainer = document.createElement(`div`);
  const cardAuthor = document.createElement(`p`);
  const cardPages = document.createElement(`p`);
  const cardRead = document.createElement(`p`);

  // Create DOM Structure
  articleElement.append(cardHeaderDiv, cardInformationContainer);
  cardHeaderDiv.append(cardHeaderTitle, cardOptionsButton, cardOptionsMenuContainer);
  cardOptionsMenuContainer.append(cardOptionsMenuContent);
  cardOptionsMenuContent.append(cardEditButton, cardDeleteButton);
  cardOptionsButton.append(cardOptionsIconSvg,);
  cardOptionsIconSvg.append(cardOptionsIconPath);
  cardInformationContainer.append(cardAuthor,cardPages,cardRead);

  // Set Element Classes and Attributes
  articleElement.setAttribute(`class`, `book-card`);
  cardHeaderDiv.setAttribute(`class`,  `book-card-header`);
  cardHeaderTitle.setAttribute(`class`, `book-card-title`);
  setAttributes(cardOptionsButton, {"type": "button", "class": `book-card-options-button`});
  setAttributes(cardOptionsIconSvg, {"class": "book-card-options-icon", "viewBox": "0 0 16 16"});
  cardOptionsIconPath.setAttribute(`d`, `M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z`);
  cardOptionsMenuContainer.setAttribute(`class`, `card-options-menu`);
  cardOptionsMenuContent.setAttribute(`class`,`card-options-menu-content`);
  cardEditButton.setAttribute(`class`, `edit-card-button`);
  cardDeleteButton.setAttribute(`class`, `delete-card-button`);
  cardInformationContainer.setAttribute(`class`, `book-card-information`);

  // Add Text to Options Menu Buttons
  cardEditButton.textContent = `Edit`;
  cardDeleteButton.textContent = `Delete`;

  // Populate Card Information and Title
  cardHeaderTitle.textContent = Book.title;
  cardAuthor.textContent = `by, ${Book.author}`;
  cardPages.textContent = `${Book.pages} pages`;
  Book.read ? cardRead.textContent = `You have read this book.` : cardRead.textContent = `You haven't read this book.`;
  bookCardContainer.append(articleElement);
} 

// Listeners
addBookButton.addEventListener(`click`, (e) => {
  addBookDialog.showModal();
});
closeBookFormButton.addEventListener(`click`, (e) => {
  addBookDialog.close();
});
addBookDialog.addEventListener(`submit`, () => {
  let title = document.querySelector(`input#book-title`).value;
  let author = document.querySelector(`input#book-author`).value;
  let pages = document.querySelector(`input#book-pages`).value;
  let read = () => document.querySelector(`#book-read`).checked ? true : false;
  let newBook = new Book(title, author, pages, read());
  myLibrary.push(newBook);
  addBookForm.reset();
  displayBooks();
});


displayBooks();