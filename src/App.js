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

  // Post update to server. // TODO: Handle insertion of new book
  // If the book is in the state, just update its "shelf" property.
  // Else then this is insertion of new book to the shelf.
  updateShelf = (book, bookshelfSelected ) => {
    BooksAPI.update(book, bookshelfSelected);

    // Check if this is insertion of new book to shelves,
    // or if it is updating of exisiting book on shelf.
    // Loop over all books on the shelf...
    for (var i = 0; i < this.state.books.length; i++) {
      // .. if the book that is updating exist ...
      if (this.state.books[i].id === book.id) {
        //.. check if the bookshelf selected is "none"..
        if(bookshelfSelected === "none"){
          console.log('None state called');
          //.. if its "none", remove the book from bookshelves..
          this.removeFromBookshelves(book);
        } else {
          //... else the bookshelfSelected is ["wantToRead", "currentlyReading", "read"]
          // so just switch shelf.
          this.switchBookshelf(book, bookshelfSelected);
        }
      } else {
        // // TODO: Handle insertion of new book to state
        console.log("Inserting a new book to state");
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
