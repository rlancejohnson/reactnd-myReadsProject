import React from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList.js';

export default ({ appName, lists, books, updateBook }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>{appName}</h1>
      </div>
      <div className="list-books-content">
        <ol>
          {lists.map((list) => {
            const listBooks = books.filter((book) => book.shelf === list.name);

            return (
              <BookList key={list.id} lists={lists} list={list} books={listBooks} updateBook={updateBook} />
            )
          })}
        </ol>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};