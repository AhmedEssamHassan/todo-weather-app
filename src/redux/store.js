import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeSlice";
import dbReducer from "./reducers/dbSlice";
export default configureStore({
  reducer: {
    theme: themeReducer,
    db: dbReducer,
  },
});
