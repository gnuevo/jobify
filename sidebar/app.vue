<template>
    <div>
        <ul class="list-group">
            <li class="list-group-item">
                <span class="badge badge-secondary">{{ platform }}</span>
                <span class="badge badge-success" v-if="saved == true">Saved</span>
                <span class="badge badge-secondary" v-else>Not saved</span>
                <p style="font-size:1.5em;">{{ title }}</p>
                <p>{{ compInfo }}</p>
            </li>

            <li class="list-group-item">
                <button class="btn btn-outline-primary" type="button" data-toggle="collapse" data-target="#jobDescription" aria-expanded="false" aria-controls="collapseExample">
                        Description
                </button>         
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-primary" v-if="saved == false" @click="action('save-job');">Save Job</button>
                    <button type="button" class="btn btn-success" v-else @click="action('save-job');" disabled>Saved</button>
                    <button type="button" v-if="saved == true" class="btn btn-success" @click="action('delete-job');">
                        <span style="fill:white;" class="btn-label"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"/></svg></span>
                    </button>
                </div>
                <button class="btn btn-warning" type="button" v-if="saved == true" data-toggle="collapse" data-target="#actionCollapse" aria-expanded="false" aria-controls="actionCollapse">
                            New Action
                        <span style="fill:black;" class="btn-label"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z"/></svg></span>
                </button>
                <div class="collapse" id="actionCollapse">
                    <br></br>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Select the type of action</label>
                        <select class="form-control" id="newaction.select">
                            <option value="Send application">Send application</option>
                            <option value="Send message">Send message</option>
                            <option value="Receive response">Receive response</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Example textarea</label>
                        <textarea class="form-control" id="newaction.text" rows="3"></textarea>
                    </div>
                    <button type="button" class="btn btn-primary float-right" data-toggle="collapse" data-target="#actionCollapse" @click="action('save-action');">Save</button>
                </div>
            </li>

            <li class="list-group-item">
                <div class="collapse" id="jobDescription">
                    <div class="card card-body">
                        {{ description }}
                    </div>
                </div>
            </li>

            <li class="list-group-item" v-if="history.length > 0">
                <h5>Actions</h5>
                <div id="example-1" class="list-group">
                    <div v-for="item in history">
                        <div href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{{ item.title }}</h5>
                            <small>{{ formatDate(item.date) }}</small>
                            </div>
                            <p class="mb-1">{{ item.text }}</p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'app',
        props: ['title', 'compInfo', 'description', 'saved', 'history'],
        data() {
            return {
                tabs: [],
                job: {},
                meta: {}
            }
        },
        methods: {
            async getTabs() {
                try {
                    // Await the tabs (since query method calls promise)
                    const fetchedTabs = await browser.tabs.query({ currentWindow: true });
                    // Clear current tabs
                    this.tabs = [];
                    // Push new tabs
                    fetchedTabs.forEach(tab => {
                        this.tabs.push(tab.title);
                    })
                    this.title = "you pressed";
                } catch (e) { console.log(e); }
            },
            setJob(job) {
                console.log("Actualising job");
                this.job = job;
                this.title = job.title;
                this.compInfo = job.company;
                this.description = job.description;
                this.platform = job.platform;
                this.history = [];
            },
            formatDate(date_string) {
                var date = new Date(date_string);
                var monthNames = [
                    "January", "February", "March", "April",
                    "May", "June", "July", "August",
                    "September", "October", "November", "December"
                ];
                var day = date.getDate();
                var month = monthNames[date.getMonth()];
                var year = date.getFullYear();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                return day + ' ' + month + ' ' + year + ', ' + hours + ':' + minutes;
            },
            actualiseJob(obj) {
                for (var [key, value] of Object.entries(obj)) {
                    this.job[key] = value;
                    this.history = value;
                    console.log(key, value, this.job[key]);
                }
            },
            setMetadata(meta) {
                console.log("VUE: Setting metadata", meta);
                this.saved = meta.saved;
                this.meta = meta;
            },
            saveNewAction() {
                console.log("Saving new action");
                var actionType = document.getElementById("newaction.select").value;
                var text = document.getElementById("newaction.text").text;
                var date = new Date();
            },
            action(actionType) {
                switch (actionType) {
                    case 'save-job':
                    case 'delete-job':
                    case 'update-job':
                        this.$emit('mymsg', { command: actionType, job: this.job});
                        break;
                    case 'save-action':
                        console.log("Saving action");
                        var new_action = {
                            title: document.getElementById("newaction.select").value,
                            text: document.getElementById("newaction.text").value,
                            date: new Date().toString()
                        };
                        this.history.push(new_action);
                        console.log("History after push", this.history);
                        this.$emit('mymsg', { command: actionType, jobid: this.job.id, history: this.history});
                        break;
                    default:
                        break;
                }
                console.log("Sent $emit");
            }
        }
    }
</script>
<style lang="css">
</style>
