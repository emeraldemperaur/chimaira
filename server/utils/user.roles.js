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
        group: rootPrivileges,
        locker: rootPrivileges,
        lockergroup: rootPrivileges
    },
    admin: {
        test: rootPrivileges,
        profile: rootPrivileges,
        group: rootPrivileges,
        locker: rootPrivileges,
        lockergroup: rootPrivileges
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
        group: rootPrivileges,
        locker: rootPrivileges,
        lockergroup: ownRights
    },
    mecha: {
        test: {
            'read:any' : ['*']
        },
        profile: rootPrivileges,
        group: rootPrivileges,
        locker: rootPrivileges,
        lockergroup: rootPrivileges
    }
}

const roles = new AccessControl(userPrivileges);

module.exports = {roles}