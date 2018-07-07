import React from 'react'
import Book from './Book'

class Bookshelf extends React.Component {

  render(){
    // Assign passed properties to consts to make it easier to access
    const books = this.props.books;
    const shelf = this.props.shelf;
    const bookshelfTitle = this.props.bookshelfTitle;
    // The array that holds only the books in that specific bookshelf
    const booksOnThatShelf = books.filter( (book) => book.shelf === shelf );

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksOnThatShelf.map( (book) => (
              <Book key={book.id} book={book} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
