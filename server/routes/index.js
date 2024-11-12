const express = require('express');
const { authRouter } = require('./auth.route');
const { userRouter } = require('./user.route');
const router = express.Router();

const routesIndex = [
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/user',
        route: userRouter
    }
]

routesIndex.forEach((route) => {router.use(route.path, route.route)})

module.exports = {router}