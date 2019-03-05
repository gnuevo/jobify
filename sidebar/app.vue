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
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>Send application</option>
                            <option>Send message</option>
                            <option>Receive response</option>
                            <option>Rejected</option>
                        </select>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Example textarea</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
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
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'app',
        props: ['title', 'compInfo', 'description', 'saved'],
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
            },
            setMetadata(meta) {
                console.log("VUE: Setting metadata", meta);
                this.saved = meta.saved;
                this.meta = meta;
            },
            action(actionType) {
                switch (actionType) {
                    case 'save-job':
                    case 'delete-job':
                        this.$emit('mymsg', { command: actionType, job: this.job});
                        break;
                    case 'save-action':
                        console.log("Saving action");
                        break;
                    default:
                        break;
                }
                console.log("Sent $emit");
            }
        }
    }
</script>
<style lang="scss">
</style>
