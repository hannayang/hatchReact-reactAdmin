import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import IndexLayout from 'layouts/IndexLayout';
import withApolloHoc from 'apollo/with-apollo-client';
import 'styles/styles.css';

class HatchedApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <IndexLayout>
            <Component {...pageProps} />
          </IndexLayout>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloHoc(HatchedApp);
