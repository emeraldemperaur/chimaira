const AccessControl = require('accesscontrol');

const rootPrivileges = {
    'create:any' : ['*'],
    'read:any' : ['*'],
    'update:any' : ['*'],
    'delete:any' : ['*']
}

let userPrivileges = {
    root: {
        test: rootPrivileges
    },
    admin: {
        test: rootPrivileges
    },
    user: {
        test: {
            'read:any' : ['*']
        }
    },
    mecha: {
        test: {
            'read:any' : ['*']
        }
    }
}

const roles = new AccessControl(userPrivileges);

module.exports = {roles}