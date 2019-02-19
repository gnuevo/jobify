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
