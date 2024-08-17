import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../../redux/slices/bookSlice';
import createBookWithID from '../../utils/createBookWithID';
import booksData from '../../data/books.json';
import './BookForm.css';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randonIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randonIndex];

    const randomBookWithID = createBookWithID(randomBook);

    dispatch(addBook(randomBookWithID));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      const book = createBookWithID({ title, author });
      dispatch(addBook(book));

      setTitle('');
      setAuthor('');
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
      </form>
    </div>
  );
};

export default BookForm;
