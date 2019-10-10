import React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Router from 'next/router';
import Head from 'next/head';
import Header from 'components/Header';
import Main from 'components/Main';
import Footer from 'components/Footer';

NProgress.configure({
  showSpinner: false,
});
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const { meta } = process.env;
const { SITE_URL } = process.env;

function IndexLayout({ children }) {
  return (
    <div className="app">
      <Head>
        <title key="title">{meta.title}</title>
        <meta charSet="utf-8" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta key="description" name="description" content={meta.description} />
        <meta key="author" name="author" content={meta.author} />
        <meta
          key="twitterCard"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta key="twitterSite" name="twitter:site" content={meta.twitter} />
        <meta key="twitterTitle" name="twitter:title" content={meta.title} />
        <meta
          key="twitterDescription"
          name="twitter:description"
          content={meta.description}
        />
        <meta
          key="twitterImage"
          name="twitter:image"
          content={`${SITE_URL}/static/img/og/placeholder.png`}
        />
        <meta key="twitterUrl" name="twitter:url" content={SITE_URL} />
        <meta key="ogType" property="og:type" content="website" />
        <meta key="ogSiteName" property="og:site_name" content={meta.title} />
        <meta key="ogTitle" property="og:title" content={meta.title} />
        <meta
          key="ogDescription"
          property="og:description"
          content={meta.description}
        />
        <meta
          key="ogImage"
          property="og:image"
          content={`${SITE_URL}/static/img/og/placeholder.png`}
        />
        <meta key="ogUrl" property="og:url" content={SITE_URL} />
        {process.env.NODE_ENV !== 'production' && (
          <link
            rel="stylesheet"
            type="text/css"
            href={`/_next/static/css/styles.chunk.css?v=${Date.now()}`}
          />
        )}
        <link
          rel="icon"
          type="image/x-icon"
          href="/static/favicon/favicon.png"
        />
        {/* additional favicons can be added here, including apple-touch-icons */}
      </Head>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}

IndexLayout.propTypes = {
  children: PropTypes.node,
};

IndexLayout.defaultProps = {
  children: null,
};

export default IndexLayout;
