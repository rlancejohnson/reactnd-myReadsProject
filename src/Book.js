import React from 'react';

/**
 * @description Renders a picture, title, and list of authors for a book
 * @param {array} lists - A list of possible book shelves
 * @param {object} book - The book we will be displaying info for
 * @param {func} updateBook - Updates the shelf for a particular book
 */
export default ({ lists, book, updateBook }) => {
  //The styling for the book thumbnail
  const tumbnailStyle = {
    width: 128,
    height: 193,
    backgroundImage: `url("${book.imageLinks.smallThumbnail}")`
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={tumbnailStyle}></div>
          <div className="book-shelf-changer">
            <select onChange={(event) => updateBook(book, event.target.value)} value={book.shelf ? book.shelf : 'none'}>
              <option value="move" disabled>Move to...</option>
              <option value="none">None</option>
              {lists.map((list) => (
                <option key={list.id} value={list.name}>{list.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors.map(author => (
            <div key={author}>{author}</div>
          ))}
        </div>
      </div>
    </li>
  );
};