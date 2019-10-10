import React from 'react';
import Container from 'components/Container';
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');

function HomePage() {
  return (
    <div data-cy="page-home">
      <Container>
        <h1>Welcome to hatch-react</h1>
        <Admin dataProvider={dataProvider}>
          <Resource name="users" list={ListGuesser} />
        </Admin>
      </Container>
    </div>
  );
}

export default HomePage;
