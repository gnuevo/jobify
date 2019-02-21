import Vue from 'vue';
import App from './app.vue';

console.log("I'm sidebar!!");

var job = {
  title: "props default title",
  compInfo: "default",
  description: "default"
}

var app = new Vue({
    el: '#my-app',
    components: {
        App
    },
    data: {
      title: "def title",
      place: "def place"
    },
    render(h) {
        return h('app', {ref: "childComponent", on: {mymsg: this.onchildevent}});
    },

    methods: {
      onchildevent: function(info) {
        console.log("onChildEvent");
        console.log(info);
      }
    }
});


// message stuff
function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: " +
    request.info.title);
    app.$refs.childComponent.setJob(request.info);

  sendResponse({response: "Response from background script"});
}

browser.runtime.onMessage.addListener(handleMessage);
