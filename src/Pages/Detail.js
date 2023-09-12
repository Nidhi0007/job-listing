import JobDetail from "../components/JobDetail";
import React, { useEffect, useState } from "react";
import { getJobDetails, getAllJobs } from "../Redux/jobSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function Detail() {
  const dispatch = useDispatch();
  const [jobData, setjobData] = useState({});
  const [otherJobs, setOtherJobs] = useState([]);
  const { id } = useParams();
  const getjobsData = async () => {
    dispatch(getJobDetails(id))
      .then((response) => {
        setjobData(response.payload);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const otherJobOpenings = async () => {
    dispatch(getAllJobs({ q: "", loc: [], dept: [], fun: [] }))
      .then((response) => {
        let data = response.payload.filter(
          (item) => item.department.title === jobData?.department?.title
        );
        setOtherJobs(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getjobsData();
  }, []);
  useEffect(() => {
    otherJobOpenings();
  }, [jobData]);
  return <JobDetail jobData={jobData} otherJobs={otherJobs} />;
}
