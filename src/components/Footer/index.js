import React from 'react';
import Container from 'components/Container';
import css from './styles.css';

function Footer() {
  return (
    <footer className={css.footer}>
      <Container>
        <small>Made with ♥ by Axiom Zen</small>
      </Container>
    </footer>
  );
}

export default Footer;
