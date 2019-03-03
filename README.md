Jobify -- Firefox extension
===========================

Looking for a job can be confusing.
There are many websites you can use, all of them look similar but they are different.
Moreover, many forms must be filled in third party pages so you never have a centralised place where you can check which jobs you applied to, which replied, which offered you an interview or in which you were rejected.

This

What it does so far
-------------------

Currently it only scrapes job info when you're surfing job offers in [glassdoor](https://www.glassdoor.com/index.htm).
When you install the extension, it loads a sidebar where info about the job will be displayed.
You can use this sidebar to save jobs to a DB.

![Demo gif](https://raw.githubusercontent.com/gnuevo/jobify/master/img/jobify.gif)

TODO
----

Many things:

+ [x] Display job information in sidebar.
+ [x] Store information about the jobs in a DB (probably LocalStorage or MongoDB).
+ [ ] Add a sidebar or button to the page so I can click `I'm applying` and actualise the info in the DB.
+ [ ] Extend functionality to other sites (LinkedIn, etc.)

Installation
------------

*Note: Before using this extension you need to have the [Jobify server](https://github.com/gnuevo/jobify_server) running on your computer*

To install it you have to

+ `git clone` this repo
+ install dependencies with `npm install`
+ build the project with `npm build`

Now you have to load it in Firefox.
To do so you have to

+ go to `about:debugging`
+ press `Load Temporary Add-on` and
+ select any file inside the `build/` folder (for example `manifest.json`)

You can also see this [explanatory video](https://www.youtube.com/watch?v=cer9EUKegG4) on how to load an extension.

Usage
-----

+ Go to [glassdoor](https://www.glassdoor.com/index.htm) and search for a job, for example [here](https://www.glassdoor.com/Job/jobs.htm?sc.keyword=&locT=C&locId=2664239&locKeyword=Madrid&srs=RECENT_SEARCHES).
+ Open the javascript console
+ Press the `jobify` tie-shaped button that appeared on the menu bar on the top (it should be somewhere to the right of the address bar). Once you do you should see `content script` logged to the javascript console. Now we should be ready to go.
+ Now a sidebar appears. Every time you click on a new job, the information is displayed in the sidebar. You can click the `Save job` button to save it to your DB.
+ When the job is saved a green badge appears on top saying `Saved`. This information is
