import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import ListBooks from './ListBooks'
// Allow us to use Router component to change components displayed based on url
import { Route } from 'react-router-dom';
// Get all methods from BooksAPI, to fetch, post data to and from server
import * as BooksAPI from './BooksAPI.js';


class BooksApp extends React.Component {
  state = {
    // Books by default is empty array.
    // It is populated thanks to fetch request made after first rendering.
    books: []
  }

  // Popolates the state with the books.
  // Gets the data from server,
  // thanks to bookAPI.js helper method getAll()
  componentDidMount(){
    BooksAPI.getAll().then((responseWithBooks) =>
       this.setState({ books: responseWithBooks }));
  }

  // Swicthes (updates) the bookshelf of an exisiting in the "books", book
  switchBookshelf = (book, bookshelfSelected) => {
    this.setState( (oldState) => (
      // Map over all books in the old state.
      // When the book that changes its shelf is found,
      // Just change its shelf property.
      oldState.books.map( (singleBook) => {
            if (singleBook.id === book.id) {
              singleBook.shelf = bookshelfSelected
              return singleBook
            } else {
              return singleBook
            }
          })));
   }

  // Removes existing book from "books", due to selection of "none" option
  removeFromBookshelves = (book) => {
  this.setState( (oldState) => ( {
    books: oldState.books.filter( (singleBook) => singleBook.id !== book.id)
    }));
  }

  // Post update to server. // TODO: Handle insertion of new book
  // If the book is in the state, just update its "shelf" property.
  // Else then this is insertion of new book to the shelf.
  updateShelf = (book, bookshelfSelected ) => {
    BooksAPI.update(book, bookshelfSelected).then((resp) => (console.log(resp)));

    // Check if this is insertion of new book to shelves,
    // or if it is updating of exisiting book on shelf.
    // Loop over all books on the shelf...
    for (var i = 0; i < this.state.books.length; i++) {
      // .. if the book that is updating exist ...
      if (this.state.books[i].id === book.id) {
        //.. check if the bookshelf selected is "none"..
        if(bookshelfSelected === "none"){
          //.. if its "none", remove the book from bookshelves..
          this.removeFromBookshelves(book);
        } else {
          //... else the bookshelfSelected is ["wantToRead", "currentlyReading", "read"]
          // so just switch shelf.
          this.switchBookshelf(book, bookshelfSelected);
        }
      } else {
        // // TODO: Handle insertion of new book to state,
        // should be pushed to the array somehow
        console.log("The book did not match");
      }
    }
  }

  render() {
    return (
      <div className="app">
        {/* Render only SearchBook component for /search URL */}
        <Route
          exact path="/search"
          render={() => (
            <SearchBook
              books={this.state.books}
              updateShelf={this.updateShelf}
            />
          )}
         />
         {/* Render only ListBooks component for home url */}
       <Route
         exact path="/"
         render={() => (
           <ListBooks
              books={this.state.books}
              updateShelf={this.updateShelf}
           />
         )}
         />
      </div>
    )
  }
}

export default BooksApp
