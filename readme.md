Students: Alex, Cristian and Teodor.

# Docker setup - Recommended

## Pre-requisites

- Two ports available: `5000`, `3306`.
- Docker & docker-composed are installed.

## Setup Procedure

1. Create a `.env` file following the structure provided in the `.env.template` in the root folder of the directory.
2. Create a `.env` for the app docker container in the [./docker/app/](./docker/app/) folder.
> It should follow the structure provided in the `.env.template` from that folder.
3. Create a `.env` for the mysql docker container in the [./docker/mysql/](./docker/mysql/) folder.
> It should follow the structure provided in the `.env.template` from that folder.
4. From the root directory, run `docker compose build`.
5. From the root directory, run `docker compose up`.

# Manual Setup

1. Create a `.env` file following the structure provided in the `.env.template`. 
2. Follow the instructions from both `sql-setup.md` and `neo4j-setup.md` to set up the `MySQL` and `Neo4J` databases.
> The Mongo Database is automatically populated from the `JSON` files when running the API.
3. Install the dependencies with `npm install`, and use the `npm start` command to run the app.

