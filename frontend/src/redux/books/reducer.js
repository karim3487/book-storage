import * as a from './actionTypes';

const initiallState = [];

const booksReducer = (state = initiallState, action) => {
  switch (action.type) {
    case a.ADD_BOOK:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default booksReducer;
