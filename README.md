Jobify -- Firefox extension
===========================

Looking for a job can be confusing.
There are many websites you can use, all of them look similar but they are different.
Moreover, many forms must be filled in third party pages so you never have a centralised place where you can check which jobs you applied to, which replied, which offered you an interview or in which you were rejected.

This

What it does so far
-------------------

Currently it only scrapes job info when you're surfing job offers in [glassdoor](https://www.glassdoor.com/index.htm).
Everytime you check a new job offer, the info is displayed as a `log()` in the console.

TODO
----

Many things:

+ Store information about the jobs in a DB (probably LocalStorage or MongoDB).
+ Add a sidebar or button to the page so I can click `I'm applying` and actualise the info in the DB.
+ Extend functionality to other sites (LinkedIn, etc.)

Installation
------------

To install it you have to

+ `git clone` this repo
+ install dependencies with `npm install`
+ build the project with `npm build`

Now you have to load it in Firfox.
To do so you have to

+ go to `about:debugging`
+ press `Load Temporary Add-on` and
+ select any file inside the `build/` folder (for example `manifest.json`)

You can also see this [explanatory video](https://www.youtube.com/watch?v=cer9EUKegG4) on how to load an extension.

Use
---

+ Go to [glassdoor](https://www.glassdoor.com/index.htm) and search for a job, for example [here](https://www.glassdoor.com/Job/jobs.htm?sc.keyword=&locT=C&locId=2664239&locKeyword=Madrid&srs=RECENT_SEARCHES).
+ Open the javascript console
+ Press the `jobify` circle-shaped button that appeared on the menu bar on the top (it should be somewhere to the right of the address bar). Once you do you should see `content script` logged to the javascript console. Now we should be ready to go.

If everything went well now we can select different jobs from the job list on the left column.
Everytime a new job is selected, the log actualises with the scraped info.
