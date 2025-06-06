const express = require('express');
const { xss } = require('express-xss-sanitizer');
const passport = require('passport');
const cors = require('cors')
const appServer = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./database');
const { User } = require('./db_models/user');
const { apiErrors } = require('./middleware/apiError');
const appRoutes = require('./routes');
const { jwtStrategy } = require('./middleware/passport');
const { QueryModel } = require('./db_models/querymodel.model');
const { ContextProfile } = require('./db_models/contextprofile.model');
const { RAGArtifact } = require('./db_models/ragartifact.model');
const { Setting } = require('./db_models/settings.model');

//DataSource
const dataSource = db.dbSQLize;
dataSource.authenticate()
.then(async () => {
    console.log(`\n\x1b[32mSuccessfully connected to 'Chimera' (${process.env.DB_TYPE}) database!\x1b[0m\n`)
    //await User.sync({force: true});
    // await QueryModel.sync( {force: true} );
    //await ContextProfile.sync( {force: true} );
    //await RAGArtifact.sync( {force: true} );
    //await Setting.sync({ force: true });
    //dataSource.sync({force: true});
})
.catch((error) => console.log(`\x1b[31mFailed to connect to 'Chimera' database: ${error.original}\x1b[0m`));

//HTTP Parser
appServer.use(bodyParser.json());

//XSS DB Sanitize
appServer.use(xss());

//Passport Authentication Middleware
appServer.use(passport.initialize());
passport.use('jwt', jwtStrategy);

//CORS Middleware
appServer.use(cors({credentials: true,  origin: 'https://chimaira-client.sliplane.app' }));

//Route Handler
appServer.use('/api', appRoutes.router);

//API Error Handler
appServer.use(apiErrors.convertToApiError);
appServer.use((err, req, res, next) => {
    apiErrors.handleError(err, res);
});
 
const port = process.env.PORT || 3001;
appServer.listen(port, ()=>{
    console.log(`\n\x1b[34m=======================\n\x1b[34mChímaira Middleware Log\n\x1b[34m=======================\n \x1b[0m`);
    console.log(`\x1b[33mChimera (server) is running on port ${port}\x1b[0m\n`);
    console.log(`\x1b[33mDatasource: ${process.env.DB_TYPE} @ ${process.env.DB_HOST}\x1b[0m\n`);


})