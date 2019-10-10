import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter } from 'next/router';
import cx from 'classnames';
import Container from 'components/Container';
import css from './styles.css';

const links = [
  {
    id: 'home',
    href: '/',
    name: 'Home',
  },
  {
    id: 'counter',
    href: '/counter',
    name: 'Counter',
  },
  {
    id: 'query',
    href: '/query',
    name: 'Query',
  },
];

const Header = ({ router }) => (
  <div className={css.header}>
    <Container>
      <img
        src="/static/img/react.svg"
        className={css.logo}
        alt="hatch-react"
        width="80"
      />
      <h1 className={css.title}>hatch-react</h1>
      <p className={css.subTitle}>A React starter kit</p>
      <nav className={css.nav}>
        {links.map((link) => (
          <Link key={link.id} href={link.href}>
            <a
              className={cx(css.navItem, {
                [css.isActive]: router.pathname === link.href,
              })}
            >
              {link.name}
            </a>
          </Link>
        ))}
      </nav>
    </Container>
  </div>
);

Header.propTypes = {
  router: PropTypes.object.isRequired,
};

export default withRouter(Header);
