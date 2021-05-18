import { config } from 'config';

// eslint-disable-next-line
const path = require('path');
// eslint-disable-next-line
const fs = require('fs');

// eslint-disable-next-line consistent-return
export default () => async (req, res, next) => {
  // Set robots.txt
  if (req.url === '/robots.txt') {
    res.type('text/plain');
    try {
      const readFile = async () => {
        return new Promise((resolve, reject) => {
          fs.readFile(path.join(__dirname, `robots.${config.READY_FOR_LIVE ? 'prod' : 'dev'}.txt`), (e, data) => {
            if (e) {
              reject(e);
            } else {
              resolve(data.toString());
            }
          });
        });
      };
      const data = await readFile();
      return res.send(data);
    } catch (e) {
      return res.send(e);
    }
  }

  // Set sitemap.xml
  // if (req.url === '/sitemap.xml') {
  //   try {
  //     const response = await getSiteMap();
  //     res.set('Cache-Control', `public, max-age=${60 * 60 * 24 * 90}`);
  //     res.type('text/xml');
  //     return res.send(response.sitemap);
  //   } catch (e) {
  //     res.type('text/html');
  //     return res.send(e);
  //   }
  // }

  // Set max-age for manifest.json
  if (req.url === '/manifest.json') {
    res.set('Cache-Control', `public, max-age=${60 * 60 * 24 * 90}`); // one year
    res.set('Content-Type', 'application/json');
  }

  // Remove X-Powered-By Header from Response Header
  res.removeHeader('X-Powered-By');

  next();
};
