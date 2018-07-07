import React from 'react'
import Book from './Book'
// The link component will allow to update browsers URL on click of link
import {Link} from 'react-router-dom';

class ListBooks extends React.Component {
  render() {
    return (
    <div>
      <p>List Books Component</p>
      <Book/>
      <div className="open-search">
        <Link to="/search">Search</Link>
      </div>
    </div>
   )
  }
}

export default ListBooks
