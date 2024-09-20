# Nurseomator - Juliette Guilbaud

I chose this project because...

# My tech stack

### Backend

-   **Node.js** with **Express**
-   Database: **PostgreSQL**

#### Docker

I've chosen to use docker for the backend and database to avoid any problems associated with multiple development environments. With Docker, I'm sure that the application will behave in the same way on all machines.

---

### Frontend : Mobile App

-   **React Native** for a cross-platform mobile application
-   **Expo** : I used the expo framework to simplify the development. I didn't have to worry about basic configurations and the devleopmnt was much faster. Expo also offers the ability to preview apps on devices in real-time without needing native code configurations.

-   For the map: **React Native Maps**

-   For http requests: **Axios**

# Local setup

## Git

Clone git repo : https://github.com/JulietteGuilbaud/gom-jabbar

## Environment variables

> Please note! In a professional and security context my .env files will not be pre-filled. To speed up your inital installation I've left all access to the database & my tokens.

The only thing missing is your local IP address so that the mobile app on your phone can communicate with your local backend:

-   In the nurseomator-app .env file : `gom-jabbar/Nursomator/nurseomator-app/.env`, modify the `EXPO_PUBLIC_API_URL` to match your local IP address. Leave the port 5001 at the end.

## Backend & DB

-   Make sure docker is open on your computer.

-   In your terminal, go to the docker folder:`cd gom-jabbar/Nursomator/backend/src/docker`

-   Run this command to fetch my docker image to have all the dependencies & database set up: `docker pull jujuguilbaud31/nurseomator:latest`

-   Start containers: `docker compose up -d` (if later you want to stop the containers run: `docker compose down`)

## Frontend

-   In your terminal, go to the nurseomator-app folder: `cd gom-jabbar/Nursomator/nurseomator-app`
-   Install dependencies: run `npm install`
-   Start the projet: run `npm start`

In each `/backend` and `/nurseomator-app` folder there's a README.md with more details on implementation and functionality.

## Test nurse account

You can login as username:`test` & password:`test` to test all features.

# Jest tests

I've created some tests for backend routes. You can run the test suites in the backend docker container with : `npm run test`
