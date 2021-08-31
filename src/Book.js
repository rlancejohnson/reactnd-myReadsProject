import React from 'react';

export default ({ lists, book, updateBook }) => {
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