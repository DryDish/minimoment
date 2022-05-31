# MySQL Database Setup

## Pre-requisites

- A running Neo4J database

## Setup Procedure

1. First, locate the import script needed within the folder [neo4j/scripts](./neo4j/scripts/).
2. Copy the contents of the [data-import.cypher](./neo4j/scripts/data-import.cypher).
3. Connect to the Database through Neo4J Browser and run the contents of the `data-import.cypher` file as a cypher query.
> This script will create all of the needed data for the API
> Note: the constraints will be added by `neode` when running the API.
