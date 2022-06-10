var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.text());
app.use(express.static("static"));

app.get("/", function (req, res) {
  res.send("index.html");
});

app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT);
});
