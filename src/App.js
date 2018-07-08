import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import ListBooks from './ListBooks'
// Allow us to use Router component to change components displayed based on url
import { Route } from 'react-router-dom'
// Get all methods from BooksAPI, to fetch, post data to and from server
import * as BooksAPI from './BooksAPI.js'


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

  // Post update to server.
  // Update the state with the changed shelf of the book.
  updateShelf = (book, bookshelfSelected) => {
      // First update the server
      BooksAPI.update(book, bookshelfSelected).then(() => {

      // Update the shelf of the book that is selected.
      book.shelf = bookshelfSelected;

      // update the state with the change of the book's shelf
      this.setState( oldState => ({
        // books = all the books from previous state without the changed one.
        // Then just add (concat) the changed one to the newly returned array.
        books: oldState.books.filter( oldStateBook => oldStateBook.id !== book.id ).concat([book])
      }))
    })
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
