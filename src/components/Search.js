import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDepartment, getFunction, getLocation } from "../Redux/jobSlice";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
} from "@mui/material";
export default function Search({ filters, setFilters }) {
  const dispatch = useDispatch();
  const [location, setLocation] = useState([]);
  const [department, setDepartment] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [chipData, setChipData] = useState([]);
  let filtersfiltersLocalStorage = JSON.parse(localStorage.getItem("filters"));

  function getLocations() {
    dispatch(getLocation())
      .then((response) => {
        setLocation(response.payload);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  function getDepartments() {
    dispatch(getDepartment())
      .then((response) => {
        setDepartment(response.payload);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  function getFunctions() {
    dispatch(getFunction())
      .then((response) => {
        setFunctions(response.payload);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  // add filters
  function selectFilters(e, attribute) {
    const { name, value } = e.target;

    if (filtersfiltersLocalStorage) { filters = filtersfiltersLocalStorage; setFilters(filtersfiltersLocalStorage) };
    // search filter
    if (name === "q") {
      localStorage.setItem("filters", JSON.stringify({ ...filters, q: e.target.value }));
      setFilters({ ...filters, q: e.target.value });
      return;
    }
    const title = attribute.props.children;
    let checkDuplicate = chipData.some((item) => item.id === value && item.type === name);
    if (checkDuplicate) {
      handleDelete({ id: value, title: title, type: name });
      return;
    }
    // deaprtment,location and function filter
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: [...prevFilters[name], { id: value, title: title, type: name }],
    }));

    localStorage.setItem("filters", JSON.stringify({ ...filters, [name]: [...filters[name], { id: value, title: title, type: name }] }))
  }

  // delete filters individually
  const handleDelete = (chipToDelete) => {
    if (filtersfiltersLocalStorage) { filters = filtersfiltersLocalStorage; };
    const updatedFilters = { ...filters };
    for (const key in updatedFilters) {
      if (Array.isArray(updatedFilters[key])) {
        updatedFilters[key] = updatedFilters[key].filter(
          (chip) => chip.id !== chipToDelete.id || chip.type !== chipToDelete.type
        );
      }
    }
    setFilters(updatedFilters);
    localStorage.setItem("filters", JSON.stringify(updatedFilters));

  };

  // delete all filters
  function clearAll() {
    let filter = { q: "", loc: [], dept: [], fun: [] };
    setFilters(filter);
    localStorage.setItem("filters", JSON.stringify(filter));
  }

  useEffect(() => {
    getLocations();
    getFunctions();
    getDepartments();
  }, []);

  useEffect(() => {
    let arr = [];
    if (filtersfiltersLocalStorage) { filters = filtersfiltersLocalStorage; };
    for (const key in filters) {
      if (Array.isArray(filters[key])) {
        arr.push(...filters[key]);
      }
    }
    setChipData(arr);
  }, [filters]);

  return (
    <div style={{ paddingLeft: "350px", paddingRight: "350px" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {/* search jobs */}
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Search"
            name="q"
            onChange={selectFilters}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <div style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",

              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            {/* department dropdown */}
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Department"
                name="dept"
                value=""
                onChange={selectFilters}
              >
                {department.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* location dropdown */}
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Location"
                name="loc"
                value=""
                onChange={selectFilters}
              >
                {location.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.city}, {option.state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* function dropdown */}
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="demo-simple-select-label">Function</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Function"
                name="fun"
                value=""
                onChange={selectFilters}
              >
                {functions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Paper
            sx={{
              display: "flex",
              padding:  "5px",
              margin:  "5px",
              flexDirection: "row", // Display chips from left to right
              flexWrap: "wrap", // Allow chips to wrap to a new line
              alignItems: "center", // Vertically center items
              justifyContent: "space-between", // Space between items
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
            component="div"
          >
            <div style={{ flex: 1, display: "flex", flexWrap: "wrap" }}>
              {chipData.map((item) => {
                let icon;

                return (
                  <span
                    key={item.id}
                    style={{ margin: "5px" }}
                  >
                    <Chip
                      icon={icon}
                      label={item.title}
                      onDelete={() => handleDelete(item)}
                    />
                  </span>
                );
              })}
            </div>
            <Button onClick={clearAll}>Clear all</Button>
          </Paper>
        </div>
      </Box>
    </div>
  );
}