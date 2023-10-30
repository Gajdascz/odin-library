const displayController = (() => {
  // Main UI DOM Selectors
  const addBookButton = document.querySelector(`.add-book-button`);
  const addBookDialog = document.querySelector(`#add-book-dialog`);
  const addBookForm = document.querySelector(`#add-book-form`);
  const closeBookFormButton = document.querySelector(`#close-button`);
  const bookCardContainer = document.querySelector(`.book-card-container`);
  const cardEditButton = document.querySelectorAll(`.edit-card-button`);
  const cardDeleteButton = document.querySelectorAll(`.delete-card-button`);
  const editBookDialog = document.querySelector(`#edit-book-dialog`);
  const editBookForm = document.querySelector(`#edit-book-form`);

  // Can set multiple attributes on a single element
  function setAttributes(element, attributes) {
    for (let attribute in attributes) {
      element.setAttribute(attribute, attributes[attribute]);
    }
  }

  // Creates the entire DOM structure for the book's display card and returns the article element 
  const createCardDisplayElement = (book) => {
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
    articleElement.setAttribute(`data`, `${book.title}-display-card`)
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
    cardAuthor.setAttribute(`class`, `book-card-author`);
    cardPages.setAttribute(`class`, `book-card-pages`);
    cardRead.setAttribute(`class`, `book-card-read`);
  
    // Add Text to Options Menu Buttons
    cardEditButton.textContent = `Edit`;
    cardDeleteButton.textContent = `Delete`;
  
    // Populate Card Information and Title
    cardHeaderTitle.textContent = book.title;
    cardAuthor.textContent = `by, ${book.author}`;
    cardPages.textContent = `${book.pages} pages`;
    book.read ? cardRead.textContent = `You have read this book.` : cardRead.textContent = `You haven't read this book.`;
    return articleElement;
  }

  // Initiates DOM event listeners
  const initEventListeners = () => {
  addBookButton.addEventListener(`click`, (e) => {
    addBookDialog.showModal();
  });
  closeBookFormButton.addEventListener(`click`, (e) => {
    addBookDialog.close();
  });
  addBookDialog.addEventListener(`submit`, () => {
    const newBook = new Book(
      addBookForm.querySelector(`input#book-title`).value,
      addBookForm.querySelector(`input#book-author`).value,
      addBookForm.querySelector(`input#book-pages`).value,
      addBookForm.querySelector(`#book-read`).checked ? true : false
    );
    newBook.createBookDisplayCard();
    myLibrary.addBook(newBook);
    myLibrary.displayBooks();
    addBookForm.reset();
  });
  bookCardContainer.addEventListener(`click`, (e) => {
    const bookTitle = e.target.closest(`.book-card-header`).querySelector(`h3.book-card-title`).textContent;
    const currentBook = myLibrary.getBookByTitle(bookTitle);
    if(currentBook) {
      if (e.target.classList.contains(`edit-card-button`)) {
        editBookForm.setAttribute( 'data-book-title', currentBook.title);
        currentBook.openEditOptions();
      }
      if (e.target.classList.contains(`delete-card-button`)) {
       myLibrary.removeBook(currentBook);
      }
  } else alert(`Error: Book not found in library!`);
  });
editBookDialog.addEventListener(`submit`, (e) => {
  const bookTitle = editBookForm.getAttribute(`data-book-title`);
  const currentBook = myLibrary.getBookByTitle(bookTitle);
  currentBook.updateBookInformation(
    editBookForm.querySelector(`input#book-title`).value,
    editBookForm.querySelector(`input#book-author`).value,
    editBookForm.querySelector(`input#book-pages`).value,
    editBookForm.querySelector(`input#book-read`).value
  );
  editBookForm.reset();
});
  }

  // Appends book's displayCard to container
  const displayBookCard = (book) => {
    bookCardContainer.append(book.displayCard)
  }

  // Opens a the options menu for a specific book Instance
  const openEditOptions = (book) => {
    editBookDialog.showModal();
    editBookForm.querySelector(`#book-title`).value = book.title;
    editBookForm.querySelector(`#book-author`).value = book.author;
    editBookForm.querySelector(`#book-pages`).value = book.pages;
    book.read ? editBookDialog.querySelector(`#book-read`).checked = true : editBookDialog.querySelector(`#book-read`).checked = false;
  }

  // Updates Books display card
  const updatedDisplayCard = (book) => {
    book.displayCard.querySelector(`.book-card-title`).textContent = book.title;
    book.displayCard.querySelector(`.book-card-author`).textContent = book.author;
    book.displayCard.querySelector(`.book-card-pages`).textContent = book.pages;
    book.displayCard.querySelector(`.book-card-read`).textContent = book.read ? `You have read this book.` : `You haven't read this book.`;
  }

  return { createCardDisplayElement, 
           initEventListeners,
           displayBookCard,
           openEditOptions, 
           updatedDisplayCard
         };
})();

const myLibrary = (() => {
  const books = [];
  const addBook = (book) => books.push(book);
  const displayBooks = () => {
    books.forEach((book) => {
      displayController.displayBookCard(book);
    });
  }
  const removeBook = (book) => {
    for(let i = 0; i < books.length; i++) {
      if(books[i].title === book.title) {
        books[i].deleteDisplayCard();
        books.splice(i, 1, 0)
      };
    }
  }
  const getBookByTitle = (bookTitle) => { 
    for(let i = 0; i < books.length; i++) {
      if(books[i].title === bookTitle) return books[i];
    }
    return false;
  }
  return {addBook, displayBooks, removeBook, getBookByTitle}
})();

class Book {
  displayCard;
  constructor(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
  }
  createBookDisplayCard() {
    this.displayCard = displayController.createCardDisplayElement(this);
  }
  deleteDisplayCard() {
    this.displayCard.remove();
  }
  openEditOptions() {
   displayController.openEditOptions(this);
  }
  updateBookInformation(title, author, pages, read) {
    this.title  = title;
    this.author = author;
    this.pages  = pages;
    this.read = Boolean(read);
    displayController.updatedDisplayCard(this);
  }
}

displayController.initEventListeners();
