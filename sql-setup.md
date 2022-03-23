# MySQL Database Setup

## Pre-requisites

- A running MySQL database
- A user with enough permissions to create and drop schemas and tables

## Setup Procedure

1. First, locate the scripts needed within the folder [sql/scripts](./sql/scripts/).
2. Next, run the script called [initial-creation-script.sql](./sql/scripts/initial-creation-script.sql).
> This script will create the schema `store` and all the necessary tables.
3. Run [stored-functions.sql](./sql/scripts/stored-functions.sql).
> This will create the stored functions that we use throughout the project.
4. Run [stored-procedures.sql](./sql/scripts/stored-procedures.sql).
> This will create the stored procedures.
5. Run [views.sql](./sql/scripts/views.sql).
6. Run [triggers.sql](./sql/scripts/triggers.sql).
7. Run [events.sql](./sql/scripts/events.sql).
> The events script contains two events:
> - The first one is the regular `create_monthly_report`
> - The second one is the test event which has the same functionality as the first one, but runs every five seconds.\
>\
> You can pick both, or just the one you want.
8. Lastly, run the [population script](./sql/scripts/initial-population-script.sql) to fill in the database with test data.


