// Intentionally vulnerable demo for GitHub code scanning practice. Do not deploy.
const express = require("express");
const _ = require("lodash");

const app = express();

app.get("/calc", (req, res) => {
  // Code injection: user input reaches eval(). CodeQL is expected to flag this.
  const result = eval(req.query.expr);
  res.send(String(result));
});

app.get("/pick", (req, res) => {
  res.json(_.pick({ a: 1, b: 2 }, String(req.query.keys || "a").split(",")));
});

if (require.main === module) {
  app.listen(3000);
}

module.exports = app;

// Lab 4: a second intentional weakness (command injection). Do not deploy.
const { exec } = require("child_process");
app.get("/ping", (req, res) => {
  exec("ping -c 1 " + req.query.host, (err, out) => res.send(out));
});
