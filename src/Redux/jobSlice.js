import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
const url=process.env.REACT_APP_SERVER
export const getLocation = createAsyncThunk("getLocation", (data) => {
  const location = axios
    .get(`${url}/api/v1/locations`, data)
    .then((res) => res.data);
  return location;
});
export const getDepartment = createAsyncThunk("getDepartment", (data) => {
  const department = axios
    .get(`${url}/api/v1/departments`, data)
    .then((res) => res.data);
  return department;
});
export const getFunction = createAsyncThunk("getFunction", (data) => {
  const functions = axios
    .get(`${url}/api/v1/functions`, data)
    .then((res) => res.data);
  return functions;
});
export const getAllJobs = createAsyncThunk("getFunction", (data) => {
  const jobs = axios
    .get(`${url}/api/v1/jobs`, data)
    .then((res) => res.data);
  return jobs;
});
export const jobSlice = createSlice({
  name: "jobListing",
  initialState: {
    locations: [],
    departments:[],
    functions:[],
    allJobs:[]
  },
  reducers: {},
  extraReducers: {
    [getLocation.fulfilled]: (state, { payload }) => {
      state.locations = payload;
    },
    [getDepartment.fulfilled]: (state, { payload }) => {
      state.departments = payload;
    },
    [getFunction.fulfilled]: (state, { payload }) => {
      state.functions = payload;
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.allJobs = payload;
    },
    
  },
});
export const jobListingData = ({ jobListing }) => jobListing;
export default jobSlice.reducer;
