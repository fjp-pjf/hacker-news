## ***Hacker news clone***

- This particular repo is a clone of the website hacker news, focused on the home/landing page.
- The frontend is done with ```Nextjs``` version 14 and backend is ```Nestjs``` version 10.

  ## This app shows
  - The top hacker news of that day exceeding to a limit of 30.

  ## Getting Started
  - Clone the repo from master branch
  - navigate to client (front-end) and server (back-end) seperately
  - Install all the necessary dependancies by running ```npm i```
  - provide a ***mongoDB URI*** in the ***app.module.ts*** page.
 
  - use ```npm run start:dev``` to run server
  - use ```npm run dev``` to start client
  - navigate to ```localhost:3000``` and you can see the app in action
 
  - A background cron job is implemented with nest.js for fetching the hacker-news everyday so keep the server running as it is dependant
