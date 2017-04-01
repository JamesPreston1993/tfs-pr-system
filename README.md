TFS Pull Request System
=======================
A system to consolidate PRs (pull requests) from multiple TFS (Team Foundation Server) projects and repositories. The system also supports gathering pull requests from multiple TFS instances.

The system presents a table of PRs for each instance, displaying information
about the PR, as well as providing a link to the PR itself.

TFS Configuration
=================
The system requires a personal access token to authenticate requests to
the instance. To create a personal access token:
* Go to Security settings on your TFS instance
* Select the personal access tokens section
* Click Add
* Add a description
* Create Token
* Copy the token into the settings file as outlined in the next section

NOTE: Personal Access Tokens can be revoked at any stage.

App Configuration
=================
First, the `settings.js` file in the config folder must be populated
with the relevant data for the TFS instance(s) you wish to query.

The settings file adheres to the following format:
````
{
    appName: 'My App',              // Name displayed in navigation bar
    instances: [                    // List of TFS instances
        key: 'tfs1',                // Identifying key used for API requests
        name: 'TFS 1',              // Display name of the instance      
        url: 'http://tfs1.com',     // Root URL for instance
        pat: '123456',              // Personal Access Token
    ]    
}
````

Once the settings file has been populated, the system must be built and
run. This can be done by running the following commands:
````
npm run build
npm start
````

Technology Used
===============
* Node.js
* Express
* Webpack
* Babel
* React
* React Router