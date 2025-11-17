# HyVee Extension Application

This application is a prototype extension for the current HyVee mobile pharmaceutical page. 
It addresses common usabiity issues regarding navigating the application and accessing prescription information.

## Build

1. Navigate to `database/.env` and enter your mySQL password in the corresponding password field.
2. Run `npm install` in the `database` directory to install dependencies.
3. Run `node install-db.js` to install and prepopulate the database.
4. While still in the `database` directory, run `node server.js` to start the API server.
5. The interface can be viewed by opening `template.html` in a browser.

Note: If any changes are made to `.env`, you will need the restart the API server to implement the changes. Any errors with database authentication will appear in the terminal where `node server.js` was executed.

## Tasks

The three tasks we implemented are:
1. Navigate to the contact screen (Easy)
2. Add a reminder to take your medication (Moderate)
3. Add a prescription medication to your account (Difficult)

## Depth

The feature that we implemented more in depth is the user's prescriptions. The database is prepopulated with one user and 3 prescriptions. When the user navigates to the refills page, data is fetched from the database and the prescription cards are displayed. Beyond this prototype, the application would take the prescription number from the add prescription screen and get real information from the pharmacy's database.