const AccessControl = require('accesscontrol');

const rootPrivileges = {
    'create:any' : ['*'],
    'read:any' : ['*'],
    'update:any' : ['*'],
    'delete:any' : ['*']
}

let userPrivileges = {
    root: {
        test: rootPrivileges,
        profile: rootPrivileges
    },
    admin: {
        test: rootPrivileges,
        profile: rootPrivileges
    },
    user: {
        test: {
            'read:any' : ['*']
        },
        profile: {
            'read:own' : ['*'],
            'update:own' : ['*'],
        }
    },
    mecha: {
        test: {
            'read:any' : ['*']
        },
        profile: rootPrivileges
    }
}

const roles = new AccessControl(userPrivileges);

module.exports = {roles}