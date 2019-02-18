/*
Content script
*/

// cargar scraper
const scrapeIt = require("scrape-it");

console.log("content script");
// MutationObserver
$(document).ready(function() {
    var mutationObserver = new MutationObserver(function(mutations) {
        // scrape data
        console.log($('#HeroHeaderModule h1').text());

        var info = scrapeIt.scrapeHTML($, {
            title: {
                selector: "#JDWrapper h1",
                how: "text"
              },
            compInfo: {
              selector: "#JDWrapper div.compInfo",
              how: "text"
            },
            description: {
              selector: "#JobDescriptionContainer",
              how: "text"
            }});
        console.log("Scraped:", info);

      browser.runtime.sendMessage({
        info
      }).then(function(message) {
        console.log("Response", message);
      }, function(e) {
        console.log("Error", e);
      });
    });

    // launch the mutationObserver on a div that never changes
    mutationObserver.observe($('#JDCol')[0], {
        characterData: true,
        childList: true,
        subtree: true
    });
});
