/*
  Scrape-This is a wrapper around scrape-it to provide some syntactic functionality
*/
// load scraper
const scrapeIt = require("scrape-it");

const keywords = ["type", "required", "default", "selector", "convert", "how", "attr", "trim", "closest", "eq", "texteq", "listItem"];

class ScrapeThis {
  constructor() {
  }

  hello() {
    console.log("This is a hello test method");
  }

  unroll_opts_recursive(opts, name, out_opts) {
    var new_opts = out_opts;
    var self = this;
    // console.log(this);
    var count = 0;
    // Object.values(opts).forEach(function(key,index) {
    for (const key in opts) {
      if (keywords.includes(key)) {
        // if so it is a terminal element, stop recursion
        var info = { name: name, object: opts };
        out_opts[name] = opts;
        break;
      } else if (Array.isArray(opts[key])) {
        // This is introduced for the case of array
        // if it's an array, include it without changes
        out_opts[key] = opts[key];
      } else {
        var recursive_name = "";
        if (!name == "") {
          recursive_name = name + ':';
        } else {
          recursive_name = name;
        }
        out_opts = self.unroll_opts_recursive(opts[key], recursive_name + key, out_opts);
      }
    };
    return out_opts
  }

  unroll_opts(opts) {
    return this.unroll_opts_recursive(opts, "", {});
  }

  roll(opts) {
    var new_opts = {};
    for (const keys_string in opts) {
      const value = opts[keys_string];
      var keys = keys_string.split(':');
      var current = new_opts;
      for (var j in keys) {
        j = parseInt(j);
        var k = keys[j];
        var k_in_current = k in current;
        if (j+1 == keys.length) {
          current[k] = value;
        } else if (!k_in_current) {
          current[k] = {};
        }
        current = current[k];
      }
    }
    return new_opts
  }

  scrapeHTML($, opts) {
    console.log("Scrape This");
    var unrolled_opts = this.unroll_opts(opts);
    console.log(unroll_opts);
    var unrolled_results = scrapeIt.scrapeHTML($, unrolled_opts);
    console.log(unrolled_results);
    var rolled_results = this.roll(unrolled_results);
    console.log(rolled_results);
    return rolled_results;
  }
}

ScrapeThis.keywords = ["type", "required", "default", "selector", "convert", "how", "attr", "trim", "closest", "eq", "texteq", "listItem"];

// var parser_opts = {
//   id: {
//     type: String,
//     required: true
//   },
//   platform: {
//     type: String,
//     required: true
//   },
//   jobUrl: {
//     type: String,
//     required: true
//   },
//   history: [{ status: String, date: Date}],
//   data: {
//     title: {
//       type: String,
//       required: true
//     },
//     company: {
//       type: String,
//       required: true
//     },
//     place: {
//       type: String,
//       default: ""
//     },
//     description: {
//       type: String,
//       required: true
//     }
//   }
// };
//
// var new_obj =  ScrapeThis.unravel_opts(parser_opts, "", {});
//
// console.log("Result--\n" + new_obj);

module.exports = {
  scrapeThis: new ScrapeThis()
}
