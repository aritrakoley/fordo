# fordo

Simple recipe web app

# Dev Setup

```sh
# Install dependencies for api
cd fordo-dev-setup/fordo/api
npm i

# Install dependencies for ui
cd fordo-dev-setup/fordo/ui
npm i

# Spin up the containers using docker compose
cd fordo-dev-setup
docker compose up
```

## TODO

- Use sequelize
  - Make update and delete queries dynamic instead of using a select query to get data
  - Remove sql-injection prone code
- Re-evaluate types used
- local_names need not be kept in a separate table
- mask ids for UI
- Figure out image storage techniques
- configure cors manually instead of using the npm package
- Choose a form handling library
- Add error handling to api utils (ui)
