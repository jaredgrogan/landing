const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

app.use('/', (req, res, next) => {
  let targetUrl = req.query.url;
  
  if (!targetUrl) {
    return res.status(400).json({ error: 'No target URL provided' });
  }

  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = 'https://' + targetUrl;
  }

  const proxy = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    secure: false,
    ws: true,
    xfwd: true,
    followRedirects: true,
    pathRewrite: (path, req) => {
      return req.url.replace(/^\/api\/proxy/, '') || '/';
    },
    router: (req) => {
      return targetUrl;
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      delete proxyRes.headers['x-frame-options'];
      delete proxyRes.headers['content-security-policy'];

      // Cache static assets
      if (proxyRes.headers['content-type'] && proxyRes.headers['content-type'].includes('text/css')) {
        proxyRes.headers['cache-control'] = 'public, max-age=86400';
      }
    },
    onError: (err, req, res) => {
      console.error('Proxy Error:', err);
      res.status(500).json({
        error: 'Proxy error',
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
      });
    }
  });

  proxy(req, res, next);
});

module.exports = app;
