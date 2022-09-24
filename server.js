const express = require("express");
const axios = require("axios");
const cors = require("cors");
const apiKey1 = "9a3c6ce90d4b4958a771bfc5370df6b1";
const apiKey2 = "43f35ad711e440ec977ce87079f2a215";
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");

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

app.get("/", (req, res) => {
  let keyword = req.query.keyword;
  let url;
  if (keyword) {
    // keyword = keyword.trim().split(" ").join("%20");
    console.log(keyword);
    // url =
    //   input +
    //   "&sortBy=popularity&searchIn=title&pageSize=21&apiKey=43f35ad711e440ec977ce87079f2a215";
    url = `https://newsapi.org/v2/everything?q=${keyword}&sortBy=popularity&searchIn=title&pageSize=21&apiKey=${apiKey1}`;
  } else {
    url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey2}`;
  }
  console.log("input is", keyword);
  console.log("url is", url);
  axios
    .get(url)
    .then((response) => {
      const firstResult = response.data.articles[0];
      console.log(firstResult.url);
      if (!firstResult.url.includes("www.youtube.com")) {
        axios.get(firstResult.url).then((html) => {
          let dom = new JSDOM(html.data, {
            url: firstResult.url,
          });
          let article = new Readability(dom.window.document).parse();
          // console.log(article.textContent);
        });
      }

      res.json(response.data.articles);
    })
    .catch((err) => console.log(err));
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => console.log(`server running on ${PORT}`));
