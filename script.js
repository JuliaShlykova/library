//Rewritting JS using ES6 classes
class Book{
    constructor(title,author,pages,read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info(){
        return `"${this.title}" by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}
class Library{
    constructor(myLibrary=[]){
        this.books = myLibrary;
    }
}
const myLibrary = new Library();

const myBook = new Book('Frankenstein', 'M. W. Shelley', 166, 'not read yet');
myLibrary.books.push(myBook);
const myBook2 = new Book('Dracula', 'B. Stoker', 326, 'not read yet');
myLibrary.books.push(myBook2);
const myBook3 = new Book('The Woman in Black', 'S. Hill', 208, 'not read yet');
myLibrary.books.push(myBook3);
const myBook4 = new Book('It', 'S. King', 1184, 'not read yet');
myLibrary.books.push(myBook4);
let shelves = document.querySelector('#shelves');
function toggleRead(){
    let codeInLibrary = this.parentNode.getAttribute('code-in-library');
    let book = myLibrary.books[codeInLibrary];
    if(book.read === 'not read yet'){
        book.read = 'already read';
    }
    else{
        book.read = 'not read yet';
    }
    let p = this.previousSibling;
    p.textContent = `Title: ${book.title}\nAuthor: ${book.author}\n${book.pages} pages\n${book.read}`;
    console.log(this.parentNode);
}
function removeBook(){
    let codeInLibrary = this.parentNode.getAttribute('code-in-library');
    myLibrary.books.splice(codeInLibrary,1);
    shelves.textContent='';
    for (let book of myLibrary.books){
        putBookOnShelf(book);
    }
}
function putBookOnShelf(book){
    let el = document.createElement("div");
    el.setAttribute('code-in-library',myLibrary.books.indexOf(book));
    let p = document.createElement("p");
    p.setAttribute('style','white-space:pre');
    p.textContent = `Title: ${book.title}\nAuthor: ${book.author}\n${book.pages} pages\n${book.read}`;
    el.appendChild(p);
    let btnToggleRead = document.createElement("button");
    btnToggleRead.classList.add('btn-toggle-read');
    btnToggleRead.textContent = 'Change read\n status';
    btnToggleRead.addEventListener('click',toggleRead);
    el.appendChild(btnToggleRead);
    let btnRemoveBook = document.createElement("button");
    btnRemoveBook.classList.add('btn-remove-book');
    btnRemoveBook.textContent = "Remove\n book";
    btnRemoveBook.addEventListener('click',removeBook);
    el.appendChild(btnRemoveBook);
    let shelf = document.createElement("div");
    shelf.classList.add('shelf');
    el.appendChild(shelf);
    shelves.appendChild(el);
}
for (let book of myLibrary.books){
    putBookOnShelf(book);
}


function addBookToLibrary(){
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#number-of-pages').value;
    let read = '';
    let radioBtns = document.querySelectorAll('input[name="read-or-not"');
    radioBtns.forEach(radio=>{
        if(radio.checked){
            if (radio.id=="no"){
                read = 'not read yet';
            }
            else{
                read = 'already read';
            }
        }
    })
    if (title===''||author===''||pages===''||read===''){
        alert("Please, fill every field")
    }
    else{
        let newBook = new Book(title,author,pages,read);
        myLibrary.books.push(newBook);
        putBookOnShelf(newBook);
        form.removeAttribute('style');
        btnOpenForm.removeAttribute('style');
    }

}
const btnOpenForm = document.querySelector("#open-form");
const form = document.querySelector('#container-for-form');
btnOpenForm.addEventListener('click',function(){
    form.setAttribute('style','display: block');
    btnOpenForm.setAttribute('style','display:none');
})
const btnAddBook = document.querySelector("#btn-add");
btnAddBook.addEventListener('click',addBookToLibrary);
