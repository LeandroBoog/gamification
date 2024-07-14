
<h1>Gamification</h1>
> A tool to gamify the IBR's student tasks

## About
This project is based on the theoretical work of this bachelor theses¹.
Through the GitLab API it aims to add an achievement system to the students weekly tasks.
It does this by analysing the repositories for given achievement milestone.


1] https://www.ibr.cs.tu-bs.de/theses/ruesch/ranking.html?lang=en&theme=2019/1000

## Configuration
Check the config.js file for any variables that need to be set.
It is required to have pdftotext installed on your system! 

## Running the Application
Warning: Running the init command deletes the database if it exists. Be careful when rerunning this command!

``` bash
# install dependencies
npm install

# setup database and 
# initalize student repos with web hook
npm run init

# start server
npm run start
```

##  Extending the service
The project structure was designed to easily add new achievement criteria.
These additions are made in service/achievementService

### Adding new achievements
Navigate too ./achievements and create a new achievement file with the criteria you wish to implement. After importing this file into the index.js file your achievement is good to go! 

### Adding new criteria
The Stats model (database/models/Stats.model) shows which criteria are currently supported alongside the default GITLAB API data.
If you wish to add new criteria, simply create a new updater function in the ./updaters directory.
In addition you will need to adapt the Stats model to persistently store the new data!
