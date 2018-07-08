import React from 'react'
import Book from './Book'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBook extends React.Component {
  // Now you will know if the app brakes because of incorrect props passed to the component.
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  state = {
    // sreachableBooks by default is empty array.
    // It is populated thanks to fetch request made after first rendering.
    sreachableBooks : [],
    // query that will be used to search books,
    // by default it is empty.
    query: ''
  }

  render(){

    // Assign passed books property to make it easier to access
    const books = this.props.books;
    const updateShelf = this.props.updateShelf;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <Book book={books} updateShelf={updateShelf} />
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook
