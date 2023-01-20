class Bookshelf{
    constructor(shelf){
        this.shelf = shelf;
        this.book = [];
    }
    describe(){
        return `${this.shelf} contains ${this.book.length}.`;
    }
}

class Books {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    addBooks(book) {
        if (book instanceof Books){
            this.book.push(book);
        } else {
            throw new Error(`Argument is not a book: ${book}`);
        }
    }
    describe(){
        return `${this.title} is writen by ${this.author}.`;
    }
}

class Menu {
    constructor() {
        this.shelf = [];
        this.selected = null;
    }

    start(){
        let selection = this.showMainMenuOptions();
        while (selection != 0){
            switch (selection){
                case '1':
                    this.createShelf();
                    break;
                case '2':
                    this.viewShelf();
                    break;
                case '3':
                    this.deleteShelf();
                    break;
                case '4':
                    this.displayShelf();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Have a good day!');
    }

    showMainMenuOptions(){
        return prompt(`
        0) exit
        1) create new shelf
        2) view shelf
        3) delete shelf 
        4) display all shelves
        `);
    }

    showShelfMenuOptions(shelfInfo){
        return prompt(`
        0) back
        1) add a book
        2) delete a book
        ------------------------
        ${shelfInfo}
        `);
    }

    displayShelf(){
        let shelfName = '';
        for(let i = 0; i < this.shelf.length; i++){
            shelfName += i + ': ' + this.shelf[i].shelf + '\n';
        }
        alert(shelfName);
    }

    createShelf(){
        let shelf = prompt('Enter name for new shelf');
        this.shelf.push(new Bookshelf(shelf));
    }

    viewShelf(){
        let x = prompt('Enter the index of the shelf you want to view');
        if(x > -1 && x < this.shelf.length){
            this.selectedShelf = this.shelf[x];
            let description = 'Shelf name: ' + this.selectedShelf.shelf + '\n';

            for(let i = 0; i < this.selectedShelf.book.length; i++){
                description += i + '. ' + this.selectedShelf.book[i].title + ' - ' + this.selectedShelf.book[i].author + ' - '
                + this.selectedShelf.book[i].isbn + '\n';
            }

            let selection = this.showShelfMenuOptions(description);
            switch(selection){
                case '1':
                    this.addBook();
                    break;
                case '2':
                    this.deleteBook();
            }
        }
    }

    deleteShelf(){
        let x = prompt('Enter the index of the shelf you want to delete');
        if(x > -1 && x < this.shelf.length){
            this.shelf.splice(x, 1);
        }
    }

    addBook(){
        let title = prompt('Enter the title of the book');
        let author = prompt('Enter the name of the Author');
        let isbn = prompt('Enter the books isbn');
        this.selectedShelf.book.push(new Books(title, author, isbn));
    }

    deleteBook(){
        let x = prompt('Enter the index of the book you wish to delete:');
        if(x > -1 && x < this.selectedShelf.book.length){
            this.selectedShelf.book.splice(x, 1);
        }
    }
    
}

let menu = new Menu();
menu.start();