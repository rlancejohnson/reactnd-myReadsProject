import React from 'react';
import Book from './Book.js';

/**
 * @description Renders books with a particular shelf
 * @param {array} lists - A list of possible book shelves
 * @param {object} list - The shelf we want to show a list of books for
 * @param {array} books - A list of books for the particular shelf
 * @param {func} updateBook - Updates the shelf for a particular book
 */
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