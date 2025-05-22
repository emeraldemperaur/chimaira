import { configureStore } from "@reduxjs/toolkit"
import UsersReducer from "./reducers/users";
import ContextProfileReducer from "./reducers/contextprofile.reducer";
import QueryModelReducer from "./reducers/querymodel.reducer";
import RAGArtifactReducer from "./reducers/ragartifact.reducer";
import NotificationsReducer from "./reducers/notifications";
import SiteReducer from "./reducers/site";

export const applicationStore = configureStore({
    reducer: {
        users: UsersReducer,
        site: SiteReducer,
        notifications: NotificationsReducer,
        contexts: ContextProfileReducer,
        queries: QueryModelReducer,
        artifacts: RAGArtifactReducer
    }
});