import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList.js';

/**
 * The search page of the books app
 * @constructor
 */
export default class BookSearch extends Component {
  state = {
    searchTerm: '',
    timerId: ''
  };

  /**
   * @description Reset the search results
   */
  componentDidMount = () => {
    this.props.resetSearch();
  };

  /**
   * @description Search books using the entered search term or reset * * search if not search term
   * @param {object} e - The event containing the search term in the * * value property of the target
   */
  handleSearch = (e) => {
    let searchTerm = e.target.value;

    this.setState({
      searchTerm
    });

    if (this.state.timerId) {
      this.clearTimer();
    }

    if (searchTerm) {
      this.setState({
        timerId: setTimeout(() => {
          this.props.searchBooks(searchTerm);
        }, 500)
      });

    } else {
      this.props.resetSearch();
    }
  };

  /**
   * @description Clears the currently queued js timer
   */
  clearTimer = () => {
    if (this.state.timerId) {
      clearTimeout(this.state.timerId);
      console.log('clear...', this.state.timerId);

      this.setState({
        timerId: ''
      });
    }
  };

  /**
   * @description Renders books search interface
   */
  render() {
    const { lists, searchResults, updateBook } = this.props;
    const { searchTerm } = this.state;

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