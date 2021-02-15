const express = require("express");
const Vue = require("vue");
const { createRenderer } = require("vue-server-renderer");
const renderer = createRenderer();
const app = express();
const Router = require("vue-router");
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      component: { template: "<div>Index</div>" }
    },
    {
      path: "/detail",
      component: { template: "<div>Detail</div>" }
    }
  ]
});

app.get("*", (req, res) => {
  const app = new Vue({
    router,
    template: `<div>
    <router-link to="/">index</router-link>
    <router-link to="/detail">detail</router-link>
    <router-view />
    </div>`,
    data() {
      return {
        msg: "hello world"
      };
    }
  });
  router.replace(req.url);
  renderer
    .renderToString(app)
    .then(html => {
      res.end(html);
    })
    .catch(err => {
      res.statusCode = 500;
      res.end(err.toString);
    });
});

app.listen(8080, () => {
  console.log("server start");
});
