import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import ListBooks from './ListBooks'
// allow us to use Router component to change components displayed based on url
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    // Books by default is empty array.
    // It is populated thanks to fetch request made after first rendering.
    books: []
  }

  render() {
    return (
      <div className="app">
        {/* Render only SearchBook component for /search URL */}
        <Route
          exact path="/search"
          render={() => ( <SearchBook /> )}
         />
         {/* Render only ListBooks component for home url */}
       <Route
         exact path="/"
         render={() => ( <ListBooks /> )}
         />
      </div>
    )
  }
}

export default BooksApp
