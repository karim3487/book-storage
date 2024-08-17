import { useSelector, useDispatch } from 'react-redux';
import { deleteBook, toggleFavorite } from '../../redux/books/actionCreators';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';
import { selectTitleFilter } from '../../redux/slices/filterSlice';
import React from 'react';
import './BookList.css';

const BookList = () => {
  const books = useSelector((state) => state.books);
  const titleFilter = useSelector(selectTitleFilter);
  const dispatch = useDispatch();

  const handleDeleteBook = (bookId) => {
    dispatch(deleteBook(bookId));
  };

  const handleToggleFavorite = (bookId) => {
    dispatch(toggleFavorite(bookId));
  };

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    return matchesTitle;
  });

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {!filteredBooks.length ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {book.title} by <strong>{book.author}</strong>
              </div>
              <div className="books-actions">
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>
                <button onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
