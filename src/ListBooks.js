import React from 'react'
import Book from './Book'

class ListBooks extends React.Component {
  render(){
    return (
      <div>
        <p>List Books Component</p>
        <Book />
      </div>
    )
  }
}

export default ListBooks
