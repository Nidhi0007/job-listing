import React, { useEffect, useState } from "react";
import { getAllJobs } from "../Redux/jobSlice";
import { useDispatch } from "react-redux";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Link,
  Chip,
} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

export default function JobsListing({ filters }) {
  const dispatch = useDispatch();
  const [allJobs, setAllJobs] = useState([]);
  let filterLocal = localStorage.getItem("filters");
  const getjobsData = async () => {
    let filtersfiltersLocalStorage = JSON.parse(filterLocal);
    if (filtersfiltersLocalStorage) filters = filtersfiltersLocalStorage;
    dispatch(getAllJobs(filters))
      .then((response) => {
        const groupedByDepartment = [];
        response.payload.forEach((job) => {
          const dept = job.department.title;
          const existingDept = groupedByDepartment.find(
            (item) => item.department === dept
          );
          if (existingDept) {
            existingDept.jobs.push(job);
          } else {
            groupedByDepartment.push({ department: dept, jobs: [job] });
          }
        });
        setAllJobs(groupedByDepartment);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    getjobsData();
  }, [filters]);
  return (
    <div style={{ paddingLeft: "350px", paddingRight: "350px" }}>
      {allJobs.map((item) => (
        <div key={item.department}>
          <h2 style={{ textAlign: "left", paddingLeft: "16px" }}>
            <span style={{ borderBottom: "3px solid #6495ED" }}>
              {item.department}
            </span>
          </h2>
          <List>
            {item.jobs.map((job) => (
              <ListItem style={{ height: "80px" }} key={job.id}>
                <ListItemText
                  style={{ paddingTop: "0px", paddingBottom: "0px" }}
                  primary={<h4 style={{ marginBottom: "4px" }}>{job.title}</h4>}
                  secondary={
                    <React.Fragment>
                      <p
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <ApartmentIcon fontSize="small" />
                        &nbsp;
                        <span>{job?.department?.title} </span> &nbsp; &nbsp;
                        <FmdGoodIcon fontSize="small" />
                        &nbsp;
                        <span>{job?.location?.city}</span>,
                        {job?.location?.state}{" "}
                      </p>
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <Link
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button style={{ borderRadius: "50px" }} variant="outlined">
                      Apply
                    </Button>
                  </Link>

                  <Link
                    href={`/jobDetail/${job.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button color="secondary">View</Button>
                  </Link>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </div>
  );
}
