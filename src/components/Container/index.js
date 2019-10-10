import React from 'react';
import PropTypes from 'prop-types';
import css from './styles.css';

const Container = ({ children }) => (
  <div className={css.container}>{children}</div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
