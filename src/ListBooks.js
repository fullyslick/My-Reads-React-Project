import React from 'react'
import Bookshelf from './Bookshelf'
// The link component will allow to update browsers URL on click of link
import {Link} from 'react-router-dom';

class ListBooks extends React.Component {
  render() {

    // Assign passed books property to make it easier to access
    const books = this.props.books;

    return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
        <Bookshelf bookshelfTitle="Want to Read" shelf="wantToRead" books={books} />
        <Bookshelf bookshelfTitle="Currently Reading" shelf="currentlyReading" books={books} />
        <Bookshelf bookshelfTitle="Read" shelf="read" books={books} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Search</Link>
      </div>
    </div>
   )
  }
}

export default ListBooks
