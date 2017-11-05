# invoiceTimeline

## Install

You need to do actions in both `app` and `api` folders


### API

Before perform any action, make sure you have [PostgreSQL](https://www.postgresql.org/) installed on your machine, up and running.

- Create a new local postgresql database named `invoice_timeline` (you may want to use [Postico](https://eggerapps.at/postico/) to do it)

- Change user name for API connexion in `api/src/config/locale.js` (unless your db username is `alexandre`)

- Install all packages with `npm i`

- Populate datas in DB with `npm run task:seed`

- Run server with `npm start`

API is listening on port 3000

### APP

- Install all packages with `npm i`

- Run Webpack with `npm start`

Visit [localhost:8081](http://localhost:8081/) to see the app running

## Usage

You can log in the app using

- email: `user0@user.co`
- password: `user`
