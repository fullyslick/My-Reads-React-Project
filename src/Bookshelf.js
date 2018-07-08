import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Bookshelf extends React.Component {
  // Here you define what the props passed to the component type should be,
  // and wheter the property is required in order to work the Bookshelf component.
  // If these props are not passed a message will be logged in console.
  // Now you will know if the app brakes because of incorrect props passed to the component.
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  render(){
    // Assign passed properties to consts to make it easier to access
    const books = this.props.books;
    const shelf = this.props.shelf;
    const bookshelfTitle = this.props.bookshelfTitle;
    // The array that holds only the books in that specific bookshelf
    const booksOnThatShelf = books.filter( (book) => book.shelf === shelf );
    // The method that will update books
    const updateShelf = this.props.updateShelf;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksOnThatShelf.map( (book) => (
              <Book key={book.id} book={book} updateShelf={updateShelf} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
