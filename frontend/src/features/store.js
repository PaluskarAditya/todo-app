import authReducer from "./auth/authSlice";
import noteReducer from "./notes/noteSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: noteReducer
  }
})

export default store