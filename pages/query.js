import React, { Fragment } from 'react';
import Head from 'components/Head';
import ExampleQuery from 'components/ExampleQuery';

const { meta } = process.env;
const { SITE_URL } = process.env;

function QueryPage() {
  return (
    <Fragment>
      <Head
        title={`${meta.title} | query`}
        description="This page demonstrates a basic apollo graphql query"
        ogImage={`${SITE_URL}/static/img/og/placeholder-override.png`}
      />
      <ExampleQuery />
    </Fragment>
  );
}

export default QueryPage;
