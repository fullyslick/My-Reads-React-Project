import React from 'react'

class Book extends React.Component {
  render(){

    // Assign passed books property to make it easier to access
    const book = this.props.book;

    // NOTE delete later
    // Now it should log the whole books object,
    // but later it should log only induvidual book
    console.log(book);
    
    return (
      <div>Single Book Component</div>
    )
  }
}

export default Book
