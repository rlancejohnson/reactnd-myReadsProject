import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookHome from './BookHome.js';
import BookSearch from './BookSearch.js';

export default class BooksApp extends Component {
  state = {
    lists: [
      {id: 0, title: 'Currently Reading', name: 'currentlyReading'},
      {id: 1, title: 'Want to Read', name: 'wantToRead'},
      {id: 2, title: 'Read', name: 'read'}
    ],
    books: [],
    searchTerm: '',
    searchResults: [],
    timeout: ''
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books
      })
    })
  }

  searchBooks = (searchTerm) => {
    this.state.timeout && clearTimeout(this.state.timeout);

    this.setState({
      searchTerm,
      timeout: setTimeout(() => {
        BooksAPI.search(this.state.searchTerm.trim(), 20).then((results) => {
          this.setState({
            searchResults: results.map(item => {
              const book = this.state.books.find(item2 => item2.id === item.id);
  
              item['shelf'] = book ? book.shelf : '';
  
              return item;
            })
          })
        })
      }, 500)
    })
  }

  updateBook = (book, list) => {
    BooksAPI.update(book, list).then();

    let books = this.state.books;

    if(list === 'none') {
      this.setState({
        books: books.filter(item => item.id !== book.id)
      })

    } else {
      let bookExists = false;

      books.forEach((item) => {
        if(item.id === book.id) {
          item.shelf = list;
          bookExists = true;
        }
      })
  
      if(bookExists) {
        this.setState({
          books
        })
        
      } else {
        book.shelf = list;
        
        this.setState({
          books: [...books, book]
        })
      }
    }
  }

  resetSearch = () => {
    this.setState({
      searchTerm: '',
      searchResults: []
    })
  }

  render() {
    const { lists, books, searchTerm, searchResults } = this.state

    return (
      <Router>
        <div className="app">
          <Route exact path='/'>
            <BookHome appName="MyReads" lists={lists} books={books} updateBook={this.updateBook}/>
          </Route>
          <Route path='/search'>
            <BookSearch lists={lists} 
              searchTerm={searchTerm} 
              searchBooks={this.searchBooks} 
              searchResults={searchResults} 
              updateBook={this.updateBook}
              resetSearch={this.resetSearch}/>
          </Route>
        </div>
      </Router>
    )
  }
}