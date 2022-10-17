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

