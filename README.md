# bain - Code challenge

This application is created on Node.JS, Express, MongoDB and ReactJS
For Automated test cases - Mocha, chai, chai-http

Primary objective was to create an API ending with /providers which will allow us to fetch data bases on passed parameters /filters

#Backend APIs
There are 2 API as following 
1. /login
2. /api/providers

Login API is for allowing authenticated user to do the search 
right now in database there is only one User with credentials testuser@bain.com/testuser. Please use these credentials to log-in application.

provider API is for quering provider data stored in MongoDB
For authentication we need to pass JWT token in query params. This will prevent users form abusing this API
We will get JWT token after successful login and use that token in subsequent request

#Front End
There are 2 screens right now 
1. Login Page
2. Search Page

Both are created using ReactJS

#How to run
1. Open command prompt. Go to Code directory, run 'npm install'
2. run 'npm run build'
3. run 'npm start'

#Test
Create file in root directory 'test.js'. There are some automated test cases to check if the APIs are responding properly or not
to run test run 'npm run test'
