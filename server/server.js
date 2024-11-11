const express = require('express');
const appServer = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./database')

//DataSource
const dataSource = db.dbSQLize;
dataSource.authenticate()
.then(() => {
    console.log(`\n\x1b[32mSuccessfully connected to 'Chimera' (${process.env.DB_TYPE}) database!\x1b[0m\n`)
})
.catch((error) => console.log(`\x1b[31mFailed to connect to 'Chimera' database: ${error.original}\x1b[0m`));

//HTTP Parser
appServer.use(bodyParser.json());

const port = process.env.PORT || 3001;
appServer.listen(port, ()=>{
    console.log(`\n\x1b[34m=====================\n\x1b[34mChímaira Middleware\n\x1b[34m=====================\n \x1b[0m`)
    console.log(`\x1b[33mChimera (server) is running on port ${port}\x1b[0m\n`)

})