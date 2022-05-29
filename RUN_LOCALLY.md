# Running Locally

The following include instructions for running this application locally.

## Requirements

1. Java 17
2. Node 17
3. Docker

## One time Tasks

1. `nvm install 17.1.0` if you don't have NVM, follow this: https://github.com/nvm-sh/nvm
2. `nvm use 17.1.0`

## Database

This project uses [Docker](https://docs.docker.com/get-docker/) to run the database. Make sure Docker is running before attempting to start the database. The following are some useful commands related to database:

- Start database - `docker-compose up`
- Stop database - `docker-compose down`
- Setup mock data - `./setup-mock-data.sh` (This must run after the backend server has started and liquibase scripts have run)

### Local Database Credentials

_root user_
username: root
password: example

_book-browser user_
username: book-browser
password: changeit

## Backend

The backend part of this project uses gradle to run tasks related the development. The following list includes some commons task that might be run:

- Start application - `./gradlew bootRun`
- Run unit tests - `./gradlew test`
- Format code - `./gradlew spotlessApply`
- Build application - `./gradlew build`
- List tasks - `./gradlew tasks`

## Frontend

The frontend code and resources are nested in this application and can navigated to like so: `cd src/main/react-ui`

The frontend part of this uses npm to run tasks related to development.The following list includes some commons task that might be run:

- Install dependencies - `npm install`
- Start application - `npm run start`
- Format code - `npm run format:write`
- Lint code - `npm run lint`
- Run unit tests - `npm run test`
- List tasks `npm run`

### Local Login Credentials

username: admin
password: admin
