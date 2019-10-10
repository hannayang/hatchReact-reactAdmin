import React from 'react';
import PropTypes from 'prop-types';
import css from './styles.css';

const Counter = ({ count, increment, decrement }) => {
  return (
    <div className={css.counter}>
      <h2 className={css.title}>Counter Component</h2>
      <div className={css.content}>
        <button type="button" className={css.button} onClick={decrement}>
          -
        </button>
        <span className={css.count}>{count}</span>
        <button type="button" className={css.button} onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
};

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
};

export default Counter;
