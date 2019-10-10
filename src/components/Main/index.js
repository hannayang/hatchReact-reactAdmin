import React from 'react';
import PropTypes from 'prop-types';
import Container from 'components/Container';
import css from './styles.css';

function Main({ children }) {
  return (
    <main className={css.main}>
      <Container>{children}</Container>
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.node,
};

Main.defaultProps = {
  children: null,
};

export default Main;
