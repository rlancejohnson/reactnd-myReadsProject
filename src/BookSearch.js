import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList.js';

/**
 * @constructor The search page of the books app
 */
export default class BookSearch extends Component {
  /**
   * @description Reset the search results
   */
  componentDidMount = () => {
    this.props.resetSearch();
  };

  /**
   * @description Search books using the entered search term or reset search if not search term
   * @param {object} e - The event containing the search term in the value property of the target
   */
  handleSearch = (e) => {
    if (e.target.value) {
      this.props.searchBooks(e.target.value);
    } else {
      this.props.resetSearch();
    }
  };

  /**
   * @description Renders books search interface
   */
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