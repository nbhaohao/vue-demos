const express = require("express");
const Vue = require("vue");
const { createRenderer } = require("vue-server-renderer");
const renderer = createRenderer();
const app = express();

app.get("/", (req, res) => {
  const app = new Vue({
    template: `<div @click="handleClick">{{msg}}</div>`,
    data() {
      return {
        msg: "hello world"
      };
    },
    methods: {
      // 无法工作，需要"激活"
      handleClick() {
        this.msg = this.msg
          .split("")
          .reverse()
          .join("");
      }
    }
  });
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
