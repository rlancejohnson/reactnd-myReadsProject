import React from 'react';
import Book from './Book.js';

export default ({ lists, list, books, updateBook }) => {
  return (
    <div className="bookshelf">
      {list &&
        <h2 className="bookshelf-title">{list.title}</h2>
      }
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books && books.map((book) => (
            <Book key={book.id} lists={lists} book={book} updateBook={updateBook} />
          ))}
        </ol>
      </div>
    </div>
  );
};