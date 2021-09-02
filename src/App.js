import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookHome from './BookHome.js';
import BookSearch from './BookSearch.js';

/**
 * The main books app component
 * @constructor
 */
export default class BooksApp extends Component {
  state = {
    lists: [
      { id: 0, title: 'Currently Reading', name: 'currentlyReading' },
      { id: 1, title: 'Want to Read', name: 'wantToRead' },
      { id: 2, title: 'Read', name: 'read' }
    ],
    books: [],
    searchResults: []
  };

  /**
   * @description Get books with a shelf
   */
  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books
      });
    });
  };

  /**
   * @description Search books using a search term
   * @param {string} searchTerm - text required to search for books
   */
  searchBooks = (searchTerm) => {
    BooksAPI.search(searchTerm, 20)
      .then((results) => {
        if (results && results.length > 0) {
          this.setState({
            searchResults: results.filter(result => result.authors && result.imageLinks && result.imageLinks.smallThumbnail).map(item => {
              const book = this.state.books.find(item2 => item2.id === item.id);

              item['shelf'] = book ? book.shelf : '';

              return item;
            })
          });
        }
      });
  };

  /**
   * @description Update the shelf of a book
   * @param {object} book - The book moving to a new shelf
   * @param {string} list - The shelf that the book should be moved to
   */
  updateBook = (book, list) => {
    BooksAPI.update(book, list).then();

    let books = this.state.books;

    if (this.state.searchResults) {
      this.state.searchResults.forEach(result => {
        if (result.id === book.id) {
          book.shelf = list;
        }
      });
    }

    if (list === 'none') {
      this.setState({
        books: books.filter(item => item.id !== book.id)
      });

    } else {
      let bookExists = false;

      books.forEach((item) => {
        if (item.id === book.id) {
          item.shelf = list;
          bookExists = true;
        }
      })

      if (bookExists) {
        this.setState({
          books
        });

      } else {
        book.shelf = list;

        this.setState({
          books: [...books, book]
        });
      }
    }
  };

  /**
   * @description Reset search results
   */
  resetSearch = () => {
    this.setState({
      searchResults: []
    });
  };

  /**
   * @description Renders the books app interface
   */
  render() {
    const { lists, books, searchResults } = this.state;

    return (
      <Router>
        <div className="app">
          <Route exact path="/">
            <BookHome appName="MyReads" lists={lists} books={books} updateBook={this.updateBook} />
          </Route>
          <Route path="/search">
            <BookSearch lists={lists}
              searchBooks={this.searchBooks}
              searchResults={searchResults}
              updateBook={this.updateBook}
              resetSearch={this.resetSearch} />
          </Route>
        </div>
      </Router>
    );
  }
}