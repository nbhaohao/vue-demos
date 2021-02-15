const express = require("express");
const { createBundleRenderer } = require("vue-server-renderer");
const path = require("path");
const fs = require("fs");

const resolve = dir => path.resolve(__dirname, dir);

const bundle = resolve("../dist/server/vue-ssr-server-bundle.json");
const bundleRenderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: fs.readFileSync(resolve("../public/index.html"), 'utf-8'),
  clientManifest: require(resolve(
    "../dist/client/vue-ssr-client-manifest.json"
  ))
});
const app = express();

app.use(express.static(resolve("../dist/client"), { index: false }));

app.get("*", (req, res) => {
  const context = {
    url: req.url
  };
  bundleRenderer
    .renderToString(context)
    .then(html => {
      res.end(html);
    })
    .catch(err => {
      res.statusCode = 500;
      console.log(err);
      res.end(err.toString());
    });
});

app.listen(8080, () => {
  console.log("server start");
});
