import express from "express";
import fetch from "node-fetch";

import { config as configDotenv } from "dotenv";
import { resolve } from "path";

configDotenv({
  path: resolve(__dirname, "../.env"),
});

const app = express();
const port = process.env.PORT || 8080; // default port to listen

const endpoint = "https://maps.googleapis.com/maps/api/place/textsearch/json";

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.get("/query/:query/:lat/:lng/:region", (req, res) => {
  const { query, lat, lng, region } = req.params;
  // res.send(`Hello ${query}`);

  const url = `${endpoint}?query=${query}&location=${lat},${lng}&region=${region}&key=${process.env.API_KEY}`;
  fetch(url)
    .then((response: any) => response.json())
    .then((json: any) => {
      res.json(json);
    })
    .catch((err: any) => {
      res.status(500).json(err);
    });
});

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
