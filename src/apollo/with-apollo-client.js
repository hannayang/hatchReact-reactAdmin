import { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { getDataFromTree } from 'react-apollo';
import nextCookies from 'next-cookies';
import cookie from 'js-cookie';
import initApollo from 'apollo/init-apollo';

const withApolloHoc = (App) => {
  return class Apollo extends Component {
    static propTypes = {
      apolloState: PropTypes.object.isRequired,
    };

    static async getInitialProps(context) {
      const { Component, router, ctx } = context;

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apolloClient = await initApollo(
        {},
        {
          getToken: () => nextCookies(ctx).token,
        },
      );

      ctx.apolloClient = apolloClient;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(context);
      }

      if (ctx.res && ctx.res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apolloClient}
            />,
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => cookie.get('token'),
      });
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};

export default withApolloHoc;
