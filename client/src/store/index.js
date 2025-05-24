import { configureStore } from "@reduxjs/toolkit"
import UsersReducer from "./reducers/users.reducer";
import ContextProfileReducer from "./reducers/contextprofile.reducer";
import QueryModelReducer from "./reducers/querymodel.reducer";
import RAGArtifactReducer from "./reducers/ragartifact.reducer";
import NotificationsReducer from "./reducers/notifications.reducer";
import ConfigurationReducer from "./reducers/settings.reducer"
import SiteReducer from "./reducers/site.reducer";

export const applicationStore = configureStore({
    reducer: {
        users: UsersReducer,
        site: SiteReducer,
        notifications: NotificationsReducer,
        contexts: ContextProfileReducer,
        queries: QueryModelReducer,
        artifacts: RAGArtifactReducer,
        configurations: ConfigurationReducer
    }
});