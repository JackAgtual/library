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

const renderLibrary = () => {
    const libDiv = document.querySelector('.books');

    // reset library each time you render
    libDiv.innerHTML = ''; 

    library.forEach((bookObj, idx) => {
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
            <button class="toggle">${btnTxt} ${bookObj.title}</button>
            <button class="remove">Remove from library ${bookObj.title}</button>
            `;
        
        // record idx of book in library
        book.setAttribute("data-idx", idx.toString());

        // add event listener to toggle read btn
        toggleReadBtnOnBook(book);

        libDiv.appendChild(book);
    });

};

const addBookToLibrary = (...arguments) => library.push(new Book(...arguments));

const removeFromLibrary = idx => {
    library.splice(idx, 1);
    renderLibrary();
};

// read / unread button
const toggleReadBtnOnBook = book => {
    // get button on book
    let toggleBtn;
    let removeBtn;
    let btnCnt = 0;
    for (let i = 0; i < book.childNodes.length; i ++) {
        if (book.childNodes[i].tagName !== 'BUTTON') continue;

        if ( [...book.childNodes[i].classList].includes('toggle')) {
            toggleBtn = book.childNodes[i];
            btnCnt++;
        } else if ([...book.childNodes[i].classList].includes('remove')) {
            removeBtn = book.childNodes[i];
            btnCnt++;
        }

        if (btnCnt >= 2) break;
    }

    // toggle button
    toggleBtn.addEventListener('click', () => {
        // get current statue of toggleBtn 
        if ([...toggleBtn.parentElement.classList].includes(READ_BTN_CLASS)) {
            // going from unread to read state
            toggleBtn.innerText = 'Read again';
        } else {
            toggleBtn.innerText = 'Finished reading';
        }
        
        // toggle read state
        toggleBtn.parentElement.classList.toggle(READ_BTN_CLASS);
    });

    // remove button
    removeBtn.addEventListener('click', () => {
        const rmIdx = Number(removeBtn.parentElement.dataset.idx);
        removeFromLibrary(rmIdx);
    });

};

// add book to library
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

    renderLibrary(); // rendering library every time book is added or removed (inefficient)
});
