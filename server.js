const express = require("express");
const axios = require("axios");
const cors = require("cors");
const apiKey1 = "9a3c6ce90d4b4958a771bfc5370df6b1";
const apiKey2 = "43f35ad711e440ec977ce87079f2a215";
let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey2}`;

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  const keyword = req.query.keyword;
  if (keyword) {
    keyword = keyword.trim().split(" ").join("%20");
    console.log(keyword);
    // url =
    //   input +
    //   "&sortBy=popularity&searchIn=title&pageSize=21&apiKey=43f35ad711e440ec977ce87079f2a215";
    url = `https://newsapi.org/v2/everything?q=${keyword}&sortBy=popularity&searchIn=title&pageSize=21&apiKey=${apiKey1}`;
  }
  console.log("input is", keyword);
  console.log("url is", url);
  axios
    .get(url)
    .then((response) => {
      res.json(response.data.articles);
    })
    .catch((err) => console.log(err));
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => console.log(`server running on ${PORT}`));
