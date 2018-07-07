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

  render() {
    return (
      <div className="app">
        {/* Render only SearchBook component for /search URL */}
        <Route
          exact path="/search"
          render={() => (
            <SearchBook
              books={this.state.books}
            />
          )}
         />
         {/* Render only ListBooks component for home url */}
       <Route
         exact path="/"
         render={() => (
           <ListBooks
              books={this.state.books}
           />
         )}
         />
      </div>
    )
  }
}

export default BooksApp
