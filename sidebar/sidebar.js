import Vue from 'vue';
import App from './app.vue';
const superagent = require('superagent');
const localhost = "http://localhost"
const port = 3000;
const remote_address = localhost + ':' + port;


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
        var command = info.command;
        console.log("onChildEvent", command);
        switch (command) {
          case 'save-job':
            // save the job
            console.log("Saving the job", info.job);
            superagent
            .post(remote_address + '/jobs')
            .send(info.job)
            .then(res => {
              console.log("Response from server", res);
              console.log(res.body);
              app.$refs.childComponent.setMetadata({ saved: true });
            })
            .catch(err => {
              console.log("Error trying to save job", err);
            });
        break;
          case 'delete-job':
          console.log("Deleting job", info.job.id);
          superagent
          .delete(remote_address + '/jobs/' + info.job.id)
          .then(res => {
            console.log("Resopnse from server", res);
            console.log(res.body);
            app.$refs.childComponent.setMetadata({ saved: false });
          })
          .catch(err => {
            console.log("Error trying to delete job");
          });
          break;
          case 'save-action':
          console.log("Save new action");
          var history = info.history;
          superagent
          .put(remote_address + '/jobs/' + info.jobid)
          .send({ history: history })
          .then(res => {
            console.log("Resopnse from server", res);
            console.log(res.body);
          })
          .catch(err => {
            console.log("Error trying to delete job");
          });
          default:
            console.log("Default command", command);
        }
      }
    }
});


// message stuff
function handleMessage(request, sender, sendResponse) {
    superagent
    .get(remote_address + '/jobs/' + request.info.id)
    .then(res => {
      console.log("Response from server", res.status);
      if (res.status == 200) {
        app.$refs.childComponent.setMetadata({ saved: true });
        var retrievedJob = res.body;
        app.$refs.childComponent.actualiseJob({ history: retrievedJob.history });
      } else {
        app.$refs.childComponent.actualiseJob({ history: [] });
      }
    })
    .catch(err => {
      console.log("Error trying to save job", err);
    });
    app.$refs.childComponent.setJob(request.info);
    app.$refs.childComponent.setMetadata({ saved: false });

  sendResponse({response: "Response from background script"});
}

browser.runtime.onMessage.addListener(handleMessage);
