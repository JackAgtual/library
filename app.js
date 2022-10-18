let library = [];

class Book {
    constructor(title, author, numPages, read) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.read = read;
    }
}

const addBookToLibrary = (...arguments) => library.push(new Book(...arguments));

const renderLibrary = () => {
    const libDiv = document.querySelector('.books');

    library.map(bookObj => {
        const book = document.createElement('div');
        book.classList.add('book');

        book.innerHTML = `
            <h3 class="title">${bookObj.title}</h3>
            <p>${bookObj.author}</p>
            `;

        libDiv.appendChild(book);
    });

}

addBookToLibrary('title1', 'author1', 3, false);
addBookToLibrary('title2', 'author2', 4, true);

renderLibrary();