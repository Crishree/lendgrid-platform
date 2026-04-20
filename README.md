# LendGrid Platform

This folder is prepared to become its own separate GitHub repository.

It includes:

- the standalone LendGrid Next.js app
- built-in GitHub Codespaces setup
- a Postgres database container
- automatic schema setup
- automatic demo data loading

## If you put this folder into its own GitHub repository

After opening that repository in GitHub Codespaces:

1. wait for setup to finish
2. open the terminal
3. run:

```bash
./start.sh
```

That will start the app on port `3000`.

## What Codespaces does automatically

- installs app dependencies
- starts Postgres
- applies `sql/init.sql`
- loads demo data from `sql/seed.sql`

## Default database connection in Codespaces

```bash
DATABASE_URL=postgresql://postgres:postgres@db:5432/lendgrid
```

## Product scope

- Products: `home_loan`, `lap`, `business_loan`
- Roles: `borrower`, `dsa_agent`, `ops_reviewer`, `provider_user`
- Lifecycle: `new -> profiled -> matched -> submitted -> provider_review -> approved/rejected -> disbursed`

## Main files

- app: UI routes
- components: forms, matching UI, ops queue
- lib: types, database, matching engine, Ruloans-derived field definitions
- sql: schema and demo data
- .devcontainer: Codespaces setup
