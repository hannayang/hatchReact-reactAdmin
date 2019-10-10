const next = require('next');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid/v4');
const sitemap = require('./sitemap');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

function sessionCookie(req, res, next) {
  const htmlPage =
    !req.path.match(/^\/(_next|static)/) &&
    !req.path.match(/\.(js|map)$/) &&
    req.accepts('text/html', 'text/css', 'image/png') === 'text/html';

  if (!htmlPage) {
    next();
    return;
  }

  if (!req.cookies.sid || req.cookies.sid.length === 0) {
    req.cookies.sid = uuidv4();
    res.cookie('sid', req.cookies.sid);
  }

  next();
}

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cookieParser());

    server.use(sessionCookie);

    server.get('/robots.txt', (req, res) => {
      if (process.env.NODE_ENV === 'production') {
        res.sendFile(path.join(__dirname, 'robots.production.txt'));
      } else {
        res.sendFile(path.join(__dirname, 'robots.development.txt'));
      }
    });

    server.get('/sitemap.xml', (req, res) => {
      sitemap.toXML((err, xml) => {
        if (err) {
          return res.status(500).end();
        }
        res.header('Content-Type', 'application/xml');
        res.send(xml);
      });
    });

    server.get('*', (req, res) => {
      return handler(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
