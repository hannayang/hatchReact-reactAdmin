import React, { Fragment } from 'react';
import Head from 'next/head';
import CounterContainer from 'containers/CounterContainer';

const { meta } = process.env;

function CounterPage() {
  return (
    <Fragment>
      <Head>
        <title key="title">{meta.title} | counter</title>
      </Head>
      <CounterContainer />
    </Fragment>
  );
}

export default CounterPage;
