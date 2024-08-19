import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/userSlice";
import authReducer from "./Auth/authSlice";
import jobReducer from "./Job/jobSlice";
import categoryReducer from "./Category/categorySlice";
import jobTypeReducer from "./JobType/jobTypeSlice";
import blogReducer from "./Blog/blogSlice";
import pageReducer from "./Page/pageSlice";
import applicationReducer from "./Application/applicationSlice";
import dashboardReducer from "./Dasboard/dashboardSlice";
import advertisementReducer from "./Advertisement/advertisementSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Define a separate persist configuration for the user reducer
const userPersistConfig = {
  key: "user",
  version: 1,
  storage,
};

// Create the user reducer with persisting configuration
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// Combine all reducers including the persisted user reducer
const rootReducer = combineReducers({
  user: persistedUserReducer, // Only user reducer is persisted
  auth: authReducer, // Only user reducer is persisted
  job: jobReducer,
  category: categoryReducer,
  jobType: jobTypeReducer,
  blog: blogReducer,
  page: pageReducer,
  application: applicationReducer,
  dashboard: dashboardReducer,
  advertisement: advertisementReducer,
});

// Create the store with the combined reducer
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
