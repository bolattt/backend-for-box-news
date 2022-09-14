const express = require("express");
const axios = require("axios");
const cors = require("cors");
const url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=43f35ad711e440ec977ce87079f2a215";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  const id = req.query.id;
  axios.get(url).then((response) => {
    //   res.send(JSON.stringify(response.data.articles));
    res.json(response.data.articles);
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server running on ${PORT}`));
