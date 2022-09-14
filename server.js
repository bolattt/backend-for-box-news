const express = require("express");
const axios = require("axios");
const cors = require("cors");
let url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=43f35ad711e440ec977ce87079f2a215";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  const input = req.query.url;
  if (input) {
    url =
      input +
      "&sortBy=popularity&searchIn=title&pageSize=21&apiKey=43f35ad711e440ec977ce87079f2a215";
  }
  console.log("input is", input);
  console.log("url is", url);
  axios
    .get(url)
    .then((response) => {
      res.json(response.data.articles);
    })
    .catch((err) => console.log(err));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server running on ${PORT}`));
