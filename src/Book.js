import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {
  // Now you will know if the app brakes because of incorrect props passed to the component.
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired,
    allBooksOnShelves: PropTypes.array.isRequired
  }

  // Hold the state of the select input.
  state = {
    // Holds the default shelf displayed in options
    selectValue: ""
  }

  // Updates the select input with the value selected by the user.
  // Invokes updateShelf method from main component (App.js),
  // to update this books shelf in the main state.
  handleSelectChange = (event) => {
    this.setState({selectValue: event.target.value});

    this.props.updateShelf(this.props.book, event.target.value);
  }

  // When Book component is mounted,
  // Check if the book is in the shelves.
  // Filter out the book from allBooksOnShelves.
  // If it is change the selectValue to the shelf from shelves.
  // Else set selectValue to "none"
  componentDidMount(){
   let bookInShelf = this.props.allBooksOnShelves.filter( book => book.id === this.props.book.id);

   // The array bookInShelf should be 1 element long,
   // if the book displayed is in the shelves.
   if (bookInShelf.length === 1) {
     // so set the selectValue to the one of the shelf of the book.
     this.setState({selectValue: bookInShelf[0]["shelf"]})
   } else {
     // book is not in shelves so add deafault "none" selectValue
     this.setState({selectValue: "none"})
   }
  }

  render() {
    // Assign passed book property to make it easier to access
    const book = this.props.book;
    // Holds image of the book if any.
    let image = "";

    // Check if the book has an image to prevent crashes.
    // This can be also done in the <div> where image is shown like this:
    // {book.imageLinks && <div className="book-cover" style={{backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
    if (book.imageLinks) {
      image = book.imageLinks.thumbnail;
    } else {
      image = "none";
    }

    return (<li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${image})`
            }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.selectValue} onChange={this.handleSelectChange}>
              <option value="move" disabled="disabled">Move to...</option>
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
    </li>)
  }
}

export default Book
