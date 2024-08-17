import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithID from '../../utils/createBookWithID';

const initialState = [];

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBook: (state, action) => {
      // return [...state, action.payload];
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      //   const index = state.findIndex((book) => book.id === action.payload);
      //   if (index !== -1) {
      //     state.splice(index, 1);
      //   }
      return state.filter((book) => book.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
      // return state.map((book) =>
      //   book.id === action.payload
      //     ? { ...book, isFavorite: !book.isFavorite }
      //     : { ...book }
      // );
    },
  },
});

export const { addBook, deleteBook, toggleFavorite } = bookSlice.actions;

export const thunkFunction = async (dispatch, getState) => {
  console.log(getState());
  try {
    const res = await axios.get('http://localhost:4000/random-book');
    if (res?.status && res?.data?.title && res?.data?.author) {
      dispatch(addBook(createBookWithID(res.data, 'API')));
    }
  } catch (error) {
    console.log('Error fetching random book', error);
  }
};

export const selectBooks = (state) => state.books;

export default bookSlice.reducer;
