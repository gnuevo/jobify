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
    browser.tabs.executeScript(null, {
        file: "./content_script.js"
    }).then((obj) => {
        console.log(obj);
        console.log("Injectado script");
    });
}

browser.browserAction.onClicked.addListener(clickListener);
