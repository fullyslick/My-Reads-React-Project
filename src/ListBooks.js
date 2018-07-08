import React from 'react'
import Bookshelf from './Bookshelf'
// The link component will allow to update browsers URL on click of link
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class ListBooks extends React.Component {

  // Now you will know if the app brakes because of incorrect props,
  // passed to the component.
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  render() {

    // Assign passed books property to make it easier to access
    const books = this.props.books;
    const updateShelf = this.props.updateShelf;

    return (<div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf bookshelfTitle="Want to Read" shelf="wantToRead" books={books} updateShelf={updateShelf}/>
          <Bookshelf bookshelfTitle="Currently Reading" shelf="currentlyReading" books={books} updateShelf={updateShelf}/>
          <Bookshelf bookshelfTitle="Read" shelf="read" books={books} updateShelf={updateShelf}/>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Search</Link>
      </div>
    </div>)
  }
}

export default ListBooks
