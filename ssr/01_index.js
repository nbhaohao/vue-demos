const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.end('<p>hello world123</p>');
});

app.listen(8080, () => {
  console.log("server start");
});
