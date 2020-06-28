const { createProxyMiddleware } = require("http-proxy-middleware");
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";  
module.exports = function (app) {
  app.use(
    ["/api"],
    createProxyMiddleware({
      target: API_BASE_URL
    })
  );
};