// DOM Element Selectors
const addBookButton = document.querySelector(`.add-book-button`);
const addBookDialog = document.querySelector(`#add-book-dialog`);
const addBookForm = document.querySelector(`#add-book-form`);
const closeBookFormButton = document.querySelector(`#close-button`);
const bookCardContainer = document.querySelector(`.book-card-container`);




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

function setAttributes(element, attributes) {
  for(attribute in attributes) {
    console.log(attribute);
    element.setAttribute(attribute, attributes[attribute]);
    console.log(element);
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
  const cardInformationContainer = document.createElement(`div`);
  const cardAuthor = document.createElement(`p`);
  const cardPages = document.createElement(`p`);
  const cardRead = document.createElement(`p`);

  // Create DOM Structure
  articleElement.append(cardHeaderDiv, cardInformationContainer);
  cardHeaderDiv.append(cardHeaderTitle, cardOptionsButton);
  cardOptionsButton.append(cardOptionsIconSvg);
  cardOptionsIconSvg.append(cardOptionsIconPath);
  cardInformationContainer.append(cardAuthor,cardPages,cardRead);

  // Set Element Classes and Attributes
  articleElement.setAttribute(`class`, `book-card`);
  cardHeaderDiv.setAttribute(`class`,  `book-card-header`);
  cardHeaderTitle.setAttribute(`class`, `book-card-title`);
  setAttributes(cardOptionsButton, {"type": "button", "class": `book-card-options-button`});
  // cardOptionsButton.setAttribute(`type="button"`, `class="book-card-options-button"`);
  // cardOptionsIconSvg.setAttribute(`class="book-card-options-icon"`, `viewBox="0 0 16 16"`, `xmlns="http://www.w3.org/2000/svg"`);
  setAttributes(cardOptionsIconSvg, {"class": "book-card-options-icon", "viewBox": "0 0 16 16"});
  cardOptionsIconPath.setAttribute(`d`, `M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z`);
  cardInformationContainer.setAttribute(`class`, `book-card-information`);

  // Populate Card Information and Title
  cardHeaderTitle.textContent = Book.title;
  cardAuthor.textContent = `by, ${Book.author}`;
  cardPages.textContent = `${Book.pages} pages`;
  console.log(Book.read);
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
  createBookCard(newBook);
  addBookToLibrary();
  addBookForm.reset();
});