const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

app.use(cors());

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
    followRedirects: true,
    pathRewrite: (path, req) => {
      // Keep the original path for Vercel sites
      return req.url.replace(/^\/api\/proxy/, '') || '/';
    },
    router: (req) => {
      return targetUrl;
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      delete proxyRes.headers['x-frame-options'];
      delete proxyRes.headers['content-security-policy'];

      // Handle HTML responses for Vercel sites
      if (proxyRes.headers['content-type'] && proxyRes.headers['content-type'].includes('text/html')) {
        let body = '';
        proxyRes.on('data', (chunk) => {
          body += chunk;
        });
        proxyRes.on('end', () => {
          body = body.replace(/<base[^>]*>/i, `<base href="${targetUrl}">`);
          body = body.replace(/<head>/i, `<head><script>
            (function() {
              var originalPushState = history.pushState;
              history.pushState = function(state, title, url) {
                originalPushState.apply(this, arguments);
                window.dispatchEvent(new Event('popstate'));
              };
            })();
          </script>`);
          res.end(body);
        });
      }
    },
    onError: (err, req, res) => {
      console.error('Proxy Error:', err);
      res.status(500).json({
        error: 'Proxy error',
        message: err.message
      });
    }
  });

  proxy(req, res, next);
});

module.exports = app;
