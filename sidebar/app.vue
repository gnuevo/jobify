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
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-primary" v-if="saved == false" @click="action('save-job');">Save Job</button>
                    <button type="button" class="btn btn-success" v-else @click="action('save-job');" disabled>Saved</button>
                    <button type="button" v-if="saved == true" class="btn btn-success" @click="action('delete-job');">
                        <span style="fill:white;" class="btn-label"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"/></svg></span>
                    </button>
                </div>
            </li>
            <li class="list-group-item">
                <p>
                    <button class="btn btn-outline-primary" type="button" data-toggle="collapse" data-target="#jobDescription" aria-expanded="false" aria-controls="collapseExample">
                        Description
                    </button>
                </p>
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
                this.$emit('mymsg', { command: actionType, job: this.job});
                console.log("Sent $emit");
            }
        }
    }
</script>
<style lang="scss">
</style>
