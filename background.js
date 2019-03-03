const superagent = require('superagent');

// superagent.get('https://api.nasa.gov/planetary/apod')
// .query({ api_key: 'DEMO_KEY', date: '2017-08-02' })
// .end((err, res) => {
//   if (err) { return console.log(err); }
//   console.log(res.body.url);
//   console.log(res.body.explanation);
// });

// superagent.get('https://reqres.in/api/users')
// .query({ page: 2, per_page: 5 })
// .end((err, res) => {
//   if (err) { return console.log(err); }
//   console.log(res);
//   console.log(res.body);
// });

superagent.post('http://localhost:3000/jobs')
// .withCredentials()
.send({
      id: "glassdoor:new_job",
      platform: "glassdoor",
      jobUrl: "<url>",
      title: "Cool job:new_job",
      company: "Cool company:new_job",
      description: "Oh, this job is really cool:new_job"
    })
.then(res => {
  console.log("Rersponse from server:");
  console.log(res);
  console.log(res.body);
})
.catch(err => {
  console.log("Error from server:");
  console.log(err);
});

console.log("background.js");


// browser.sidebarAction.setPanel(
//     {
//         panel: browser.extension.getURL("./sidebar/sidebar.html")
//     }
// );
// console.log("culo");

// browser.tabs.getCurrent().then(function(tabInfo) {
//     // set the panel
//     console.log(tabInfo.id);
//     browser.sidebarAction.setPanel(
//         {
//             panel: "sidebar/sidebar.html",
//             tabId: tabInfo.id
//         }
//     );
// }, function(e) {
//     console.log(e);
// });


function clickListener(tab) {
    console.log("Pulsado");
    browser.sidebarAction.open();
    browser.tabs.executeScript(null, {
        file: "./content_script.js"
    }).then((obj) => {
        console.log(obj);
        console.log("Injectado script");
    });
}

browser.browserAction.onClicked.addListener(clickListener);


// message stuff
// function handleMessage(request, sender, sendResponse) {
//   console.log("Message from the content script: " +
//     request.info.title);
//   sendResponse({response: "Response from background script"});
// }
//
// browser.runtime.onMessage.addListener(handleMessage);
