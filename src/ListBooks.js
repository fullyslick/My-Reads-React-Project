import React from 'react'
import Book from './Book'
// The link component will allow to update browsers URL on click of link
import {Link} from 'react-router-dom';

class ListBooks extends React.Component {
  render() {
    
    // Assign passed books property to make it easier to access
    const books = this.props.books;

    return (
    <div>
      <p>List Books Component</p>
      <Book book={books} />
      <div className="open-search">
        <Link to="/search">Search</Link>
      </div>
    </div>
   )
  }
}

export default ListBooks
