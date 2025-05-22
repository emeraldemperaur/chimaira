const AccessControl = require('accesscontrol');

const rootPrivileges = {
    'create:any' : ['*'],
    'read:any' : ['*'],
    'update:any' : ['*'],
    'delete:any' : ['*']
}

const ownRights = {
    'create:own' : ['*'],
    'read:own' : ['*'],
    'update:own' : ['*'],
    'delete:own' : ['*']
}

let userPrivileges = {
    root: {
        test: rootPrivileges,
        profile: rootPrivileges,
        context: rootPrivileges,
        query: rootPrivileges,
        rag: rootPrivileges
    },
    admin: {
        test: rootPrivileges,
        profile: rootPrivileges,
        context: rootPrivileges,
        query: rootPrivileges,
        rag: rootPrivileges
    },
    user: {
        test: {
            'read:any' : ['*']
        },
        profile: {
            'read:own' : ['*'],
            'update:own' : ['*'],
            'delete:own' : ['*']
        },
        context: rootPrivileges,
        query: rootPrivileges,
        rag: rootPrivileges
    },
    mecha: {
        test: {
            'read:any' : ['*']
        },
        profile: rootPrivileges,
        context: rootPrivileges,
        query: rootPrivileges,
        rag: rootPrivileges
    },
    guest: {
        test: {
            'read:any' : ['*']
        },
        profile: {
            'read:own' : ['*'],
            'update:own' : ['*'],
            'delete:own' : ['*']
        },
        context:  {
            'read:own' : ['*'],
            'update:own' : ['*'],
            'delete:own' : ['*']
        },
        query:  {
            'read:own' : ['*'],
            'update:own' : ['*'],
            'delete:own' : ['*']
        },
        rag:  {
            'read:own' : ['*'],
            'update:own' : ['*'],
            'delete:own' : ['*']
        }
    },
}

const roles = new AccessControl(userPrivileges);

module.exports = {roles}