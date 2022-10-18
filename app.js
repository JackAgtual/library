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

    // reset library each time you render
    libDiv.innerHTML = ''; 

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

const form = document.querySelector('#add-book');
form.addEventListener('submit', e => {
    e.preventDefault(); // prevents page refresh
    
    addBookToLibrary(
        form.elements.namedItem('title').value,
        form.elements.namedItem('author').value,
        form.elements.namedItem('numPages').value,
        form.elements.namedItem('read').checked
    );

    // reset form
    form.reset();

    renderLibrary();
});
