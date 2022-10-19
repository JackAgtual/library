let library = [];
const READ_BTN_CLASS = 'unread';

class Book {
    constructor(title, author, numPages, read) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.read = read;
    }
}

const addBookToLibrary = (...arguments) => library.push(new Book(...arguments));

const toggleReadBtnOnBook = book => {
    // get button on book
    let btn;
    for (let i = 0; i < book.childNodes.length; i ++) {
        if (book.childNodes[i].tagName === 'BUTTON') {
            btn = book.childNodes[i];
            break;
        }
    }
        
    btn.addEventListener('click', () => {
        // get current statue of btn 
        if ([...btn.parentElement.classList].includes(READ_BTN_CLASS)) {
            // going from unread to read state
            btn.innerText = 'Read again';
        } else {
            btn.innerText = 'Finished reading';
        }
        
        // toggle read state
        btn.parentElement.classList.toggle(READ_BTN_CLASS);
    });
};

const renderLibrary = () => {
    const libDiv = document.querySelector('.books');

    // reset library each time you render
    libDiv.innerHTML = ''; 

    library.map(bookObj => {
        const book = document.createElement('div');
        book.classList.add('book');

        let btnTxt;
        if (bookObj.read) {
            btnTxt = 'Read again';
        } else {
            btnTxt = 'Finished reading';
            book.classList.add('unread');
        }
        
        book.innerHTML = `
            <h3 class="title">${bookObj.title}</h3>
            <p>Author: ${bookObj.author}</p>
            <p>Page count: ${bookObj.numPages}</p>
            <button>${btnTxt}</button>
            `;
        
        // add event listener to toggle read btn
        toggleReadBtnOnBook(book);

        libDiv.appendChild(book);
    });

};

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
