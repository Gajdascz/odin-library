// DOM Element Selectors, Variable Definitions, and Constructors
// #region
const addBookButton = document.querySelector(`.add-book-button`);
const addBookDialog = document.querySelector(`#add-book-dialog`);
const addBookForm = document.querySelector(`#add-book-form`);
const closeBookFormButton = document.querySelector(`#close-button`);
const bookCardContainer = document.querySelector(`.book-card-container`);
const cardEditButton = document.querySelectorAll(`.edit-card-button`);
const cardDeleteButton = document.querySelectorAll(`.delete-card-button`);
const editBookDialog = document.querySelector(`#edit-book-dialog`);
const editBookForm = document.querySelector(`#edit-book-form`);

// Variable Definitions
const myLibrary = [];

// Constructors
function Book(title, author, pages, read,) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
}
// #endregion


// Helper Functions
// #region 
// Displays all books currently in myLibrary Array
const displayBooks = () => {
  myLibrary.forEach(Book => {
    createBookCard(Book);
  });
}

// Sets multiple attributes on a single element
function setAttributes(element, attributes) {
  for (attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
}

// Creates and Displays All Book Cards.
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
  cardInformationContainer.append(cardAuthor, cardPages, cardRead);

  // Set Element Classes and Attributes
  articleElement.setAttribute(`class`, `book-card`);
  cardHeaderDiv.setAttribute(`class`, `book-card-header`);
  cardHeaderTitle.setAttribute(`class`, `book-card-title`);
  setAttributes(cardOptionsButton, { "type": "button", "class": `book-card-options-button` });
  setAttributes(cardOptionsIconSvg, { "class": "book-card-options-icon", "viewBox": "0 0 16 16" });
  cardOptionsIconPath.setAttribute(`d`, `M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z`);
  cardOptionsMenuContainer.setAttribute(`class`, `card-options-menu`);
  cardOptionsMenuContent.setAttribute(`class`, `card-options-menu-content`);
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

// Opens the Edit Book Form and Populates Inputs With Currently Defined Values
    // **IMPORTANT: I've used delete to leave a hole in the array intentionally. 
    // This allows the edited version of the book to be put back and displayed in the same place it was removed.
const openEditBookDialog = (libraryEntry) => {
  editBookDialog.showModal();
  editBookForm.querySelector(`#book-title`).value = libraryEntry[1].title;
  editBookForm.querySelector(`#book-author`).value = libraryEntry[1].author;
  editBookForm.querySelector(`#book-pages`).value = libraryEntry[1].pages;
  libraryEntry[1].read ? editBookDialog.querySelector(`#book-read`).checked = true : editBookDialog.querySelector(`#book-read`).checked = false;
  delete myLibrary[libraryEntry[0]];
  deleteBookCard(libraryEntry[1]);
}

// Deletes Book From Array and Removes Displayed Card
const deleteBook = (libraryEntry) => {
  myLibrary.splice(libraryEntry[0], 1);
  deleteBookCard(libraryEntry[1]);
}

// Only Deletes The Displayed Card
const deleteBookCard = (libraryEntry) => {
  const bookCardHeaders = bookCardContainer.querySelectorAll(`.book-card-header`);
  bookCardHeaders.forEach((header) => {
    if (header.firstChild.textContent === libraryEntry.title) header.parentElement.remove();
  });
}

// Checks The Current Library Array and Returns The Book and Corresponding Index
function checkLibraryArray(bookTitle) {
  bookTitle = bookTitle.toLowerCase();
  for (let i = 0; i <= myLibrary.length; i++) {
    if (myLibrary[i].title.toLowerCase() === bookTitle) return [i, myLibrary[i]];
  }
  return false;
}
// #endregion


// Listeners
// #region
// Handles User Adding Book Actions
addBookButton.addEventListener(`click`, (e) => {
  addBookDialog.showModal();
});
closeBookFormButton.addEventListener(`click`, (e) => {
  addBookDialog.close();
});
addBookDialog.addEventListener(`submit`, () => {
  let title = addBookForm.querySelector(`input#book-title`).value;
  let author = addBookForm.querySelector(`input#book-author`).value;
  let pages = addBookForm.querySelector(`input#book-pages`).value;
  let read = () => addBookForm.querySelector(`#book-read`).checked ? true : false;
  let newBook = new Book(title, author, pages, read());
  myLibrary.push(newBook);
  addBookForm.reset();
  createBookCard(newBook);
});

// Handles Card Option Menu Events
bookCardContainer.addEventListener(`click`, (e) => {
  if (e.target.classList.contains(`edit-card-button`)) {
    const bookTitle = e.target.parentElement.parentElement.parentElement.querySelector(`.book-card-title`).textContent;
    const checkResult = checkLibraryArray(bookTitle);
    checkResult ? openEditBookDialog(checkResult) : alert(`Error: Book not found! `);
  }
  if (e.target.classList.contains(`delete-card-button`)) {
    const bookTitle = e.target.parentElement.parentElement.parentElement.querySelector(`.book-card-title`).textContent;
    const checkResult = checkLibraryArray(bookTitle);
    checkResult ? deleteBook(checkResult) : alert(`Error: Book not found!`);
  }
});

// Applies Users Requested Edits and Puts The Book Back In It's Original Location (Array and Display)
editBookDialog.addEventListener(`submit`, () => {
  let title = editBookForm.querySelector(`input#book-title`).value;
  let author = editBookForm.querySelector(`input#book-author`).value;
  let pages = editBookForm.querySelector(`input#book-pages`).value;
  let read = () => editBookForm.querySelector(`#book-read`).checked ? true : false;
  let newBook = new Book(title, author, pages, read());
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i] === undefined) myLibrary[i] = newBook;
  }
  myLibrary.push(newBook);
  editBookForm.reset();
  createBookCard(newBook);
});
// #endregion


// Displays Books In Array On Page Load
displayBooks();