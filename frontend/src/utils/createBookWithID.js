import { v4 as uuidv4 } from 'uuid';
const createBookWithID = (book, source) => {
  return {
    ...book,
    isFavorite: false,
    id: uuidv4(),
    source: source,
  };
};

export default createBookWithID;
