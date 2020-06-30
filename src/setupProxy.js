const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};

//################################################################################################
//NOTE: Everything started with '/api' gets appended to target. e.g if an api call is `/api/auth` 
// that will become `http://localhost:5000/api/auth` while proxying.
// while for production in static.json the proxy configuration everything after '/api/' gets 
// appended. Therefore, add the `/api` at the end of origin. Example below. The `/api` is being 
// appended to origin  `https://${API_APP_NAME}.herokuapp.com`

// static.json <at the root of the project>.
//{
//   "root":"build/",
//   "routes": {
//       "/**": "index.html"
//     },
//   "proxies": {
//     "/api/*": {
//       "origin": "https://${API_APP_NAME}.herokuapp.com/api"
//     }
//   }
// }
//This configuration will work when working on localhost and after deploying the app to Heroku.
//##################################################################################################