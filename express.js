const express = require("express");
const Datastore = require("nedb");
const fetch = require("node-fetch");
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Starting server at ${port}`));
app.use(express.static("build"));
app.use(
  express.json({
    limit: "1mb"
  })
);

const dataUsers = new Datastore("dataUsers.db");
dataUsers.loadDatabase();

app.post("/users", (request, response) => {
  const data = request.body;
  dataUsers.findOne({
      email: data.email,
      password: data.password
    },
    function (err, doc) {
      response.json(doc);
    }
  );
});

app.post("/api", (request, response) => {
  const data = request.body;
  dataUsers.insert(data);
  response.json(data);
});

app.get("/currencies", async (request, response) => {
  const api_url = "http://webtask.future-processing.com:8068/currencies";
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);
});

app.post("/userData", (request, response) => {
  const data = request.body;
  dataUsers.update({
    email: data.email
  }, {
    $set: {
      username: data.username,
      email: data.email,
      password: data.password,
      PLN: data.PLN,
      USD: data.USD,
      EUR: data.EUR,
      CHF: data.CHF,
      RUB: data.RUB,
      CZK: data.CZK,
      GBP: data.GBP
    }
  }, {}, function (err, numReplaced) {
    response.json(numReplaced)
  })
  dataUsers.persistence.compactDatafile()
});