import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDepartment, getFunction, getLocation } from "../Redux/jobSlice";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItem,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
} from "@mui/material";
export default function Search() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState([]);
  const [department, setDepartment] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [filters, setFilters] = useState([]);

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
  useEffect(() => {
    getLocations();
    getFunctions();
    getDepartments();
  }, []);
  function selectFilters(e) {
    setFilters([...filters, e.target.value]);
  }
  const handleDelete = (chipToDelete) => () => {
    setFilters((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  function clearAll(){
    setFilters([])
  }

  return (
    <div>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            endAdornment={<InputAdornment position="start"></InputAdornment>}
            label="Amount"
          />
        </FormControl>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Age"
              onChange={selectFilters}
            >
              {department.map((option) => (
                <MenuItem key={option.id} value={option.title}>
                  {option.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="outlined-select-currency-native"
            select
            label="Location"
            defaultValue="EUR"
            onChange={selectFilters}
            SelectProps={{
              native: true,
            }}
            helperText="Please select your currency"
          >
            {location.map((option) => (
              <option key={option.id} value={option.city + "," + option.state}>
                {option.city}, {option.state}
              </option>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency-native"
            select
            label="Function"
            defaultValue="EUR"
            SelectProps={{
              native: true,
            }}
            onChange={selectFilters}
            helperText="Please select your currency"
          >
            {functions.map((option) => (
              <option key={option.id} value={option.title}>
                {option.title}
              </option>
            ))}
          </TextField>
        </div>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,

            m: 0,
          }}
          component="ul"
        >
          <Button onClick={clearAll}>Clear all</Button>
          {filters.map((data) => {
            let icon;

            return (
              <ListItem key={data}>
                <Chip icon={icon} label={data} onDelete={handleDelete(data)} />
              </ListItem>
            );
          })}
        </Paper>
      </Box>
    </div>
  );
}
