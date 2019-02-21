<template>
    <div>
        <ul class="list-group">
            <li class="list-group-item">
                <p style="font-size:1.5em;">{{ title }}</p>
                <p>{{ compInfo }}</p>
            </li>
            <li class="list-group-item">
                <button type="button" class="btn btn-primary" @click="action('clicked');">Save Job</button>
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
        props: ['title', 'compInfo', 'description'],
        data() {
            return {
                tabs: [],
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
                this.title = job.title;
                this.compInfo = job.compInfo;
                this.description = job.description;
            },
            action(actionType) {
                this.$emit('mymsg', { data: "empty"});
                console.log("Sent $emit");
            }
        }
    }
</script>
<style lang="scss">
</style>
