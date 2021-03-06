# MySQL Database Setup

## Pre-requisites

- A running MySQL database
- A user with enough permissions to create and drop schemas and tables

## Setup Procedure

1. First, locate the scripts needed within the folder [sql/scripts](./sql/scripts/).
2. We can create the users with their corresponding permissions by running the [users.sql](./sql/scripts/users.sql) script.
3. Next, run the script called [initial-creation-script.sql](./sql/scripts/initial-creation-script.sql).
> This script will create the schema `store` and all the necessary tables.
4. Run [stored-functions.sql](./sql/scripts/stored-functions.sql).
> This will create the stored functions that we use throughout the project.
5. Run [stored-procedures.sql](./sql/scripts/stored-procedures.sql).
> This will create the stored procedures.
5. Run [views.sql](./sql/scripts/views.sql).
6. Run [triggers.sql](./sql/scripts/triggers.sql).
7. Run [events.sql](./sql/scripts/events.sql).
> The events script contains two events:
> - The first one is the regular `create_monthly_report`
> - The second one is the test event which has the same functionality as the first one, but runs every five seconds.\
>\
>  You can pick both, or just the one you want.
8. Once everything is done, the audit triggers can be created by running the [audit-triggers.sql](./sql/scripts/audit-triggers.sql) script.
9. Lastly, run the [population script](./sql/scripts/initial-population-script.sql) to fill in the database with test data.

## Using the API with the populated users

In order to easily use the `/login` endpoint, all of the populated users have a hashed password of `1234`. For the password encryption to work, the value of the `AUTH_SECRET_KEY` environment variable has to be `kea-databases`.
This means that the `/login` route can be used with the following body:
```json
{
    "username": "<Any of the populated user's username; ex: admin>",
    "password": 1234
}
```
The token is valid for `24 hours` after this.
