import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Link,
  Chip,
  CardContent,
  Card,
} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ShareJob from "./ShareJob";
export default function JobDetail({ jobData, otherJobs }) {
  return (
    <List>
      <ListItem key={jobData.id}>
        <ListItemText
          style={{ paddingTop: "0px", paddingBottom: "0px" }}
          primary={
            <h2 style={{ textAlign: "left", marginBottom: "4px" }}>
              <span>{jobData.title}</span>
            </h2>
          }
          secondary={
            <React.Fragment>
              <div
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #6495ED",
                }}
              >
                <p style={{ display: "flex", alignItems: "center" }}>
                  <ApartmentIcon fontSize="small" />
                  &nbsp;
                  <span>{jobData?.department?.title} </span> &nbsp; &nbsp;
                  <FmdGoodIcon fontSize="small" />
                  &nbsp;
                  <span>{jobData?.location?.city}</span>,
                  {jobData?.location?.state}{" "}
                  <Chip
                    style={{ marginLeft: "10px", borderRadius: "0px" }}
                    label={jobData?.type}
                  />
                </p>
                <Link
                  href={jobData.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    style={{ borderRadius: "50px", width: "125px" }}
                    variant="contained"
                  >
                    Apply
                  </Button>
                </Link>
              </div>
              <div style={{ display: "flex" }}>
                <div
                  dangerouslySetInnerHTML={{ __html: jobData.description }}
                />
                <div>
                  <Card
                    sx={{ minWidth: 300 }}
                    style={{ backgroundColor: "aliceblue" }}
                  >
                    <CardContent>
                      <h3>
                        <span style={{ borderBottom: "3px solid #6495ED" }}>
                          OTHER JOB OPENINGS
                        </span>
                      </h3>
                      <List>
                        {otherJobs.map((job) => (
                          <ListItem
                            style={{ height: "80px", paddingLeft: "0px", marginBottom:"20px" }}
                            key={job.id}
                          >
                            <ListItemText
                              style={{
                                paddingTop: "0px",
                                paddingBottom: "0px",
                              }}
                              primary={
                                <h4 style={{ marginBottom: "4px" }}>
                                  {job.title}
                                </h4>
                              }
                              secondary={
                                <React.Fragment>
                                  <p
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginTop:"10px"
                                    }}
                                  >
                                    <ApartmentIcon fontSize="small" />
                                    &nbsp;
                                    <span>{job?.department?.title} </span>{" "}
                                    &nbsp; &nbsp;
                                    <FmdGoodIcon fontSize="small" />
                                    &nbsp;
                                    <span>{job?.location?.city}</span>,
                                    {job?.location?.state}{" "}
                                  </p>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                  <ShareJob />
                </div>
              </div>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
