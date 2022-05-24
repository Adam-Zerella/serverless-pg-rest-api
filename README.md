# {{TITLE}}

> {{DESCRIPTION}} 🦴

This RESTful API is built with the [Serverless framework](https://www.serverless.com/) along with Aurora Serverless [Postgres](https://www.postgresql.org/) as our DB.

## Usage 📖

Let's do this...

## Local development

This app relies on the [Serverless framework](https://www.serverless.com/) for local development, hot-reloading and debugging.

### Getting started 🌱

```sh
yarn install
```

#### Database setup 📦

As we rely on [Postgres](https://www.postgresql.org/), we need to create, migrate and connect to an instance somewhere.

A popular solution is to run an instance via [Docker](https://www.docker.com/)

> NOTE: AWS Aurora Serverless Postgres currently only supports Postgres 10.14.

```sh
docker run \
    -e POSTGRES_PASSWORD=postgres \
    -e POSTGRES_DB=todos \
    -e LANG='en_US.UTF-8' \
    -p 5432:5432 \
    -d postgres:10
```

From here, you can connect using a popular client such as [Postbird](https://www.electronjs.org/apps/postbird) or [pgAdmin4](https://www.pgadmin.org/download/) to visualise and interact with the data.

##### Migrations

To create the database tables and seed it with some initial data:

```sh
yarn db
```

For running migrations in production, **only use**: 

```sh
yarn db:migrate
```

#### Hot reloading 🔫

To spin up a local instance of this API:

```sh
yarn dev
```

## Deployment 🚢

This command will deploy obiding by your local `.env` file, ensure this is configured for the
environment you're deploying to.

```sh
yarn deploy \
    --stage <STAGE> \
    --aws-profile <PROFILE>
```
 
## Documentation 📚

TODO: Grab and render from API gateway
