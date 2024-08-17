import {
  setTitleFilter,
  setAuthorFilter,
  selectTitleFilter,
  selectAuthorFilter,
  resetFilters,
} from '../../redux/slices/filterSlice';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import './Filter.css';

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);

  const handlerTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handlerAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const handlerResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            value={titleFilter}
            onChange={handlerTitleFilterChange}
            type="text"
            placeholder="Filter by title..."
          />
        </div>
        <div className="filter-group">
          <input
            value={authorFilter}
            onChange={handlerAuthorFilterChange}
            type="text"
            placeholder="Filter by author..."
          />
        </div>
        <button onClick={handlerResetFilters}>Resrt Filters</button>
      </div>
    </div>
  );
};

export default Filter;
