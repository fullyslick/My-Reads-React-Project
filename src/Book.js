import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {
  // Now you will know if the app brakes because of incorrect props passed to the component.
  static propTypes = {
    book: PropTypes.object.isRequired
  }

  render(){

    // Assign passed books property to make it easier to access
    const book = this.props.book;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              {/* // TODO: Replace defaultValue with value */}
              <select defaultValue={book.shelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    )
  }
}

export default Book
