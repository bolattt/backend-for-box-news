const express = require("express");
const axios = require("axios");
const cors = require("cors");
const apiKey1 = "9a3c6ce90d4b4958a771bfc5370df6b1";
const apiKey2 = "43f35ad711e440ec977ce87079f2a215";
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");
let currentTopic = "HEADLINES";
let url;

// let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey2}`;

const app = express();

app.use(cors());

app.get("/details", (req, res) => {
  const url = req.query.url;

  axios.get(url).then((html) => {
    let dom = new JSDOM(html.data, {
      url: url,
    });
    let article = new Readability(dom.window.document).parse();
    // console.log(article.textContent);
    console.log(article.content);
    res.json(article.content);
  });
});

app.get("/pagination", (req, res) => {
  console.log("inside pagination route");
  console.log("curret topic", currentTopic);
  const page = req.query.page;
  const paginationURL = url + `&page=${page}`;
  console.log(paginationURL);
  axios.get(paginationURL).then((response) => {
    res.json(response.data.articles);
  });
});

app.get("/", (req, res) => {
  let keyword = req.query.keyword;
  if (keyword) {
    // keyword = keyword.trim().split(" ").join("%20");
    console.log(keyword);
    currentTopic = keyword;
    url = `https://newsapi.org/v2/everything?q=${keyword}&sortBy=popularity&searchIn=title&pageSize=21&apiKey=${apiKey1}`;
  } else {
    url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey2}`;
    currentTopic = "headlines";
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
