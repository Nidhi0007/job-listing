import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = process.env.REACT_APP_SERVER;

export const getLocation = createAsyncThunk("getLocation", () => {
  const location = axios
    .get(`${base_url}/api/v1/locations`)
    .then((res) => res.data);
  return location;
});

export const getDepartment = createAsyncThunk("getDepartment", () => {
  const department = axios
    .get(`${base_url}/api/v1/departments`)
    .then((res) => res.data);
  return department;
});

export const getFunction = createAsyncThunk("getFunction", () => {
  const functions = axios
    .get(`${base_url}/api/v1/functions`)
    .then((res) => res.data);
  return functions;
});

export const getAllJobs = createAsyncThunk("getAllJobs", (filters) => {
// Initialize an empty array to store query parameters
const queryParams = [];

// Check if the 'q' filter is defined and not empty
if (filters.q) {
  queryParams.push(`q=${encodeURIComponent(filters.q)}`);
}

// Check if the 'loc' filter is defined and not empty
if (filters.loc.length > 0) {
  const locString = filters.loc.map(item => encodeURIComponent(item.id)).join(",");
  queryParams.push(`loc=${locString}`);
}

// Check if the 'dept' filter is defined and not empty
if (filters.dept.length > 0) {
  const deptString = filters.dept.map(item => encodeURIComponent(item.id)).join(",");
  queryParams.push(`dept=${deptString}`);
}

// Check if the 'fun' filter is defined and not empty
if (filters.fun.length > 0) {
  const funString = filters.fun.map(item => encodeURIComponent(item.id)).join(",");
  queryParams.push(`fun=${funString}`);
}

// Combine the query parameters and build the final URL
const finalUrl = `${base_url}/api/v1/jobs${queryParams.length > 0 ? `?${queryParams.join("&")}` : ""}`;
  const jobs = axios
    .get(finalUrl)
    .then((res) => res.data);
  return jobs;
});

export const getJobDetails = createAsyncThunk("getJobDetails", (id) => {
  const jobDetails = axios
    .get(`${base_url}/api/v1/jobs/${id}`)
    .then((res) => res.data);
  return jobDetails;
});

export const jobSlice = createSlice({
  name: "jobListing",
  initialState: {
    locations: [],
    departments: [],
    functions: [],
    allJobs: [],
    jobDetails: []
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
    [getJobDetails.fulfilled]: (state, { payload }) => {
      state.jobDetails = payload;
    },

  },
});
export const jobListingData = ({ jobListing }) => jobListing;
export default jobSlice.reducer;