import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {
  // Now you will know if the app brakes because of incorrect props passed to the component.
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  // Hold the state of the select input.
  state = {
    selectValue : this.props.book.shelf
  }

  // Updates the select input with the value selected by the user.
  // Invokes updateShelf method from main component (App.js),
  // to update this books shelf in the main state.
  handleSelectChange = (event) => {
    this.setState({ selectValue: event.target.value });

    this.props.updateShelf(this.props.book, event.target.value);
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
              <select value={this.state.selectValue} onChange={this.handleSelectChange} >
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
