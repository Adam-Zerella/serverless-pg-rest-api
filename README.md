# CONTANGO

> Node.js REST API scaffold with sensible defaults and features for a FaaS environment. 🦴

This RESTful API is built with [Koa](https://koajs.com/) as an alternative to Express.js along with Postgres as our DB.

## Usage 📖

The REST API endpoints rely on generated documentation, [see here for a preview](#).

## Local development

This app relies on [Nodemon](https://nodemon.io/) for local development hot-reloading and debugging.

### Getting started 🌱

```sh
yarn install
```

#### Database setup 📦

As we rely on [Postgres](https://www.postgresql.org/), we need to create, migrate and connect to an instance somewhere.

A popular solution is to run an instance via [Docker](https://www.docker.com/)

```sh
docker run \
    -e POSTGRES_PASSWORD=postgres \
    -e POSTGRES_DB=todos \
    -e LANG='en_US.UTF-8' \
    -p 5432:5432 \
    -d postgres
```

From here, you can connect using a popular client such as [Postbird](https://www.electronjs.org/apps/postbird) or [pgAdmin4](https://www.pgadmin.org/download/) to visualise and interact with the data.

##### Migrations

To create the database tables and seed it with some initial data:

```sh
yarn db
```

#### Hot reloading 🔫

To spin up a local instance of this API:

```sh
yarn dev
```

## Deployment 🚢

This command will deploy obiding by your local `.env file, ensure this is configured for the
environment you're deploying to.

```sh
yarn deploy \
    --aws-profile az \
    --stage prod
```
 
## Documentation 📚

TODO
