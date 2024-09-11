const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/api/proxy', createProxyMiddleware({
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy': '',
  },
  onProxyReq: (proxyReq, req) => {
    const url = req.query.url;
    if (url) {
      proxyReq.path = url;
    }
  },
}));

module.exports = app;
