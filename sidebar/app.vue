<template>
    <div>
        <ul class="tab-list">
            <li class="tab-item" v-for="tab in tabs">{{ tab }}</li>
        </ul>
        <button @click="getTabs()" class="button">Get tabs!</button>
          <ul class="list-group" id="my-app">
    <li class="list-group-item">Title: {{ title }}</li>
    <li class="list-group-item">Place: {{ compInfo }}</li>
    <li class="list-group-item">Description: {{ description }}</li>
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
            }
        }
    }
</script>
<style lang="scss">
</style>
