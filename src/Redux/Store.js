import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./jobSlice";

const store =  configureStore({
  reducer: {
    job: jobSlice,
  },
});
export default store;