const express = require('express');
const { authRouter } = require('./auth.route');
const { userRouter } = require('./user.route');
const { modelGRouter } = require('./modelG.route');
const { modelLRouter } = require('./modelL.route');
const { modelSRouter } = require('./modelS.route');
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
        path: '/group',
        route: modelGRouter
    },
    {
        path: '/locker',
        route: modelLRouter
    },
    {
        path: '/lockergroup',
        route: modelSRouter
    }
]

routesIndex.forEach((route) => {router.use(route.path, route.route)})

module.exports = {router}