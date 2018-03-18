Recipe App

# Config File

* Create a config.js file in the db directory within the server directory for storing user and database information.

```JS
Use template below in db/config.js

module.exports ={

    user: 'insertuser',
    password: 'insertpassword',
    database: 'insertdatabase'
  }
```

```JS
Use template below in src/config.js

module.exports = {
  api: {
    upc: "api_key=CODE",
    ndbno: "api_key=CODE"
  }
};
```
