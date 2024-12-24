import { configureStore } from "@reduxjs/toolkit"
import UsersReducer from "./reducers/users";
import GroupReducer from "./reducers/group";
import LockerReducer from "./reducers/locker";
import LockerGroupReducer from "./reducers/lockergroup";
import NotificationsReducer, { notificationsSlice } from "./reducers/notifications";
import SiteReducer from "./reducers/site";

export const applicationStore = configureStore({
    reducer: {
        users: UsersReducer,
        site: SiteReducer,
        notifications: NotificationsReducer,
        group: GroupReducer,
        locker: LockerReducer,
        lockergroup: LockerGroupReducer
    }
});