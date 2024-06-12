# fordo

Simple recipe web app

## Dev Setup

```sh
docker compose up

# when setup is run on a windows host,
# running `npm i` on the host will not work
# since npm packages for linux and windows are incompatible
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
