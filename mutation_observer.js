/*
With this script you can track changes in the DOM
Moreover, it only fires once per change.
*/

var mutationObserver = new MutationObserver(function(mutations) {
console.log($('#HeroHeaderModule h1').text());
//   mutations.forEach(function(mutation) {
//     console.log(mutation);
//   });
});

mutationObserver.observe($('#JDCol')[0], {
  characterData: true,
  childList: true,
  subtree: true
});
