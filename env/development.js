const defaults = require('./defaults');

module.exports = {
  ...defaults,
  meta: {
    ...defaults.meta,
    title: 'hatch-react (development)',
  },
  API_URL: 'https://api.graph.cool/simple/v1/swapi',
  SUBSCRIPTION_URL: 'wss://subscriptions.graph.cool/v1/swapi',
};
