import React from 'react';
import PropTypes from 'prop-types';
import NextHead from 'next/head';
import { withRouter } from 'next/router';

const { SITE_URL } = process.env;

function Head({ title, description, ogImage, router }) {
  const { asPath } = router;

  return (
    <NextHead>
      {title && <title key="title">{title}</title>}
      {description && (
        <meta key="description" name="description" content={description} />
      )}
      {title && (
        <meta key="twitterTitle" name="twitter:title" content={title} />
      )}
      {description && (
        <meta
          key="twitterDescription"
          name="twitter:description"
          content={description}
        />
      )}
      {ogImage && (
        <meta key="twitterImage" name="twitter:image" content={ogImage} />
      )}
      <meta
        key="twitterUrl"
        name="twitter:url"
        content={`${SITE_URL}${asPath}`}
      />
      {title && <meta key="ogTitle" property="og:title" content={title} />}
      {description && (
        <meta
          key="ogDescription"
          property="og:description"
          content={description}
        />
      )}
      {ogImage && <meta key="ogImage" property="og:image" content={ogImage} />}
      <meta key="ogUrl" property="og:url" content={`${SITE_URL}${asPath}`} />
    </NextHead>
  );
}

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  ogImage: PropTypes.string,
  router: PropTypes.object.isRequired,
};

Head.defaultProps = {
  title: undefined,
  description: undefined,
  ogImage: undefined,
};

export default withRouter(Head);
