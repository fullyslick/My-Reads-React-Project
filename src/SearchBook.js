import React from 'react'
import Book from './Book'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI.js'

class SearchBook extends React.Component {
  // Now you will know if the app brakes because of incorrect props passed to the component.
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  state = {
    // sreachableBooks by default is empty array.
    // It is populated with fecth request when query is changed.
    searchableBooks: [],
    // query that will be used to search books,
    // by default it is empty string.
    query: ''
  }

  // Updates the "state".
  // (queryFromInput) is passed from JSX template below, this is the value from the input field.
  // The method sets new "query" value in the "state".
  // Then the input is re-rendered with the new "state" as input value.
  updateQuery = (queryFromInput) => {

    // Check if the queryFromInput is in the serach terms.
    // If it is then make a fetch request and then update uqery
    this.setState({query: queryFromInput})

    // If the queryFromInput is not empty string make a request to server
    if (queryFromInput !== "") {
      BooksAPI.search(queryFromInput).then((books) => {
        // If the sever has match for the query,
        // it will return array.
        if (books instanceof Array) {
          // Add books to state.
          this.setState({searchableBooks: books})
        } else {
          // If the server did not found match,
          // it will return something else,
          // so just empty the searchableBooks.
          this.setState({searchableBooks: []})
        }
      })
    } else {
      // If the queryFromInput is empty string, then just clear searchableBooks
      this.setState({searchableBooks: []})
    }
  }

  render() {
    const books = this.state.searchableBooks;
    // Assign passed updateShelf property to make it easier to access
    const updateShelf = this.props.updateShelf;

    return (<div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author"
            /** Note that the value attribute is set on the <input> element.
            * Our displayed value will always be the value in the component's state,
            * making our state the "single source of truth."
            */
            value={this.state.query}
            // onChange invokes function that invokes updateQuery with the value of the input as argument
            onChange={(event) => this.updateQuery(event.target.value)}/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book) => (<Book key={book.id} book={book} updateShelf={updateShelf} allBooksOnShelves={this.props.books}/>))}
        </ol>
      </div>
    </div>
    )
  }
}

export default SearchBook
