import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import { addBook, fetchBook } from '../../redux/slices/bookSlice';
import { setError } from '../../redux/slices/errorSlice';
import createBookWithID from '../../utils/createBookWithID';
import booksData from '../../data/books.json';
import './BookForm.css';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randonIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randonIndex];

    const randomBookWithID = createBookWithID(randomBook, 'random');

    dispatch(addBook(randomBookWithID));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      dispatch(addBook(createBookWithID({ title, author }, 'manual')));

      setTitle('');
      setAuthor('');
    } else {
      dispatch(setError('You must fill title and author'));
    }
  };

  const handleAddRandomBookViaAPI = async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchBook('http://localhost:4000/random-book-delayed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titlte: </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title"
        />
        <label htmlFor="author">Author: </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter an author"
        />
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add random
        </button>
        <button
          type="button"
          onClick={handleAddRandomBookViaAPI}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            'Add random via API'
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
