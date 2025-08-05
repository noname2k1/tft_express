const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { shopRoll } = require("./shop");
const { useItem, getItems } = require("./item");
const { getTraits } = require("./trait");
const { getChamps } = require("./champ");
const getLatestVersion = require("./version");
const proxy = require("./proxy");

const app = express();

app.use(cors()); // Cho phép tất cả domain
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// hoặc chỉ cho phép một số origin
// app.use(cors({ origin: "http://127.0.0.1:5500" }));
const port = 3000;
const prefix = "v1.0";
app.use("/" + prefix, express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to tft_express api");
});
// Route với prefix /v14
app.get(`/${prefix}/versions/latest`, (req, res) => {
  getLatestVersion().then((ver) => {
    res.json({
      version: ver,
    });
  });
});

app.get(`/${prefix}/champs`, getChamps);
app.get(`/${prefix}/champs/random`, shopRoll);
app.get(`/${prefix}/items`, getItems);
app.post(`/${prefix}/items/use`, useItem);
app.get(`/${prefix}/traits`, getTraits);
app.get(`/${prefix}/proxy`, proxy);

app.listen(port, () => {
  console.log(`tft_express listening on http://localhost:${port}`);
});
