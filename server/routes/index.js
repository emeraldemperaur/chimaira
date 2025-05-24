const express = require('express');
const { authRouter } = require('./auth.route');
const { userRouter } = require('./user.route');
const { contextProfileRouter } = require('./contextprofile.route');
const { queryModelRouter } = require('./querymodel.route');
const { ragArtifactRouter } = require('./ragartifact.route');
const { configurationRouter } = require('./settings.routes');
const router = express.Router();

const routesIndex = [
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/context',
        route: contextProfileRouter
    },
    {
        path: '/query',
        route: queryModelRouter
    },
    {
        path: '/rag',
        route: ragArtifactRouter
    },
    {
        path: '/config',
        route: configurationRouter
    }
]

routesIndex.forEach((route) => {router.use(route.path, route.route)})

module.exports = {router}