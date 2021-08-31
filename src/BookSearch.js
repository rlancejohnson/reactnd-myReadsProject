import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList.js';

export default class BookSearch extends Component {
  componentDidMount = () => {
    this.props.resetSearch();
  };

  handleSearch = (e) => {
    if (e.target.value) {
      this.props.searchBooks(e.target.value);
    } else {
      this.props.resetSearch();
    }
  };

  render() {
    const { lists, searchTerm, searchResults, updateBook } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={searchTerm} onChange={this.handleSearch} />
          </div>
        </div>
        <div className="search-books-results">
          {searchResults &&
            <BookList lists={lists} books={searchResults} updateBook={updateBook} />
          }
        </div>
      </div>
    );
  }
}