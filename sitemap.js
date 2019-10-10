const sm = require('sitemap');

const { SITE_URL } = process.env;

const sitemap = sm.createSitemap({
  hostname: SITE_URL,
  cacheTime: 600000, // 600 sec - cache purge period
  urls: [{ url: '/', priority: 1.0 }, { url: '/counter' }, { url: '/query' }],
});

module.exports = sitemap;
