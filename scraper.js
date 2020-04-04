const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://www.cbinsights.com/research-unicorn-companies";

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const statsTable = $("tbody > tr");
    let unicornLists = [];

    statsTable.each(function() {
      const company = $(this)
        .find("td > a")
        .text();
      const valuation = $(this)
        .find("td:nth-child(2)")
        .text();
      const date = $(this)
        .find("td:nth-child(3)")
        .text();
      const country = $(this)
        .find("td:nth-child(4)")
        .text();
      const industry = $(this)
        .find("td:nth-child(5)")
        .text();
      const investor = $(this)
        .find("td:last-child")
        .text();

      unicornLists.push({
        company,
        valuation,
        date,
        country,
        industry,
        investor
      });
    });
    console.log(unicornLists);

    fs.writeFile("data.json", JSON.stringify(unicornLists, null, 4), err =>
      console.log("File successfully written!")
    );
  })
  .catch(console.error);
