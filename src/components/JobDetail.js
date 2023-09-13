import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Chip,
  CardContent,
  Card,
} from "@mui/material";
import { Link } from "react-router-dom";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ShareJob from "./ShareJob";
export default function JobDetail({ jobData, otherJobs }) {
  return (
    <List>
      <ListItem key={jobData?.id}>
        <ListItemText
          style={{ paddingTop: "0px", paddingBottom: "0px" }}
          primary={
            <>
              <div>
                <h5 style={{ textAlign: "left", marginBottom: "0px" }}>
                  {jobData?.department?.title} Department At {jobData?.company}
                </h5>
                <h2
                  style={{
                    textAlign: "left",
                    marginBottom: "4px",
                    marginTop: "0px",
                  }}
                >
                  <span>{jobData?.title}</span>
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0px",
                }}
              >
                <ApartmentIcon fontSize="small" />
                &nbsp;
                <span>{jobData?.department?.title} </span> &nbsp; &nbsp;
                <FmdGoodIcon fontSize="small" />
                &nbsp;
                <span>{jobData?.location?.city}</span>,{" "}
                {jobData?.location?.state}{" "}
                <Chip
                  style={{ marginLeft: "10px", borderRadius: "0px" }}
                  label={jobData?.type}
                />
              </div>
            </>
          }
          secondary={
            <>
              <div
                style={{
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  borderBottom: "1px solid #6495ED",
                }}
              >
                <a
                  href={jobData?.applyUrl}
                  target="__blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    style={{ borderRadius: "50px", width: "125px" }}
                    variant="contained"
                  >
                    Apply
                  </Button>
                </a>
              </div>
              <div style={{ display: "flex" }}>
                <div
                  dangerouslySetInnerHTML={{ __html: jobData?.description }}
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
                            component={Link}
                            to={`/jobDetail/${job.id}`}
                            style={{
                              height: "80px",
                              paddingLeft: "0px",
                              marginBottom: "20px",
                            }}
                            key={job.id}
                          >
                            <ListItemText
                              style={{
                                paddingTop: "0px",
                                paddingBottom: "0px",
                              }}
                              primary={
                                <h4
                                  style={{
                                    marginBottom: "4px",
                                    color: "black",
                                  }}
                                >
                                  {job.title}
                                </h4>
                              }
                              secondary={
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginTop: "10px",
                                  }}
                                >
                                  <ApartmentIcon fontSize="small" />
                                  &nbsp;
                                  <span>{job?.department?.title} </span> &nbsp;
                                  &nbsp;
                                  <FmdGoodIcon fontSize="small" />
                                  &nbsp;
                                  <span>{job?.location?.city}</span>,{" "}
                                  {job?.location?.state}{" "}
                                </div>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                  <ShareJob jobUrl={jobData?.hostedUrl} />
                </div>
              </div>
            </>
          }
        />
      </ListItem>
    </List>
  );
}
