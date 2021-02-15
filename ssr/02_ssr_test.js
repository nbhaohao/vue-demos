const Vue = require("vue");
const { createRenderer } = require("vue-server-renderer");

const app = new Vue({
  template: `<div><span>hello world</span></div>`
});

const renderer = createRenderer();

renderer
  .renderToString(app)
  .then(html => {
    console.log(html);
  })
  .catch(err => {
    console.log(err);
  });
