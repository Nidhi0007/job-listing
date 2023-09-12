import React from 'react'
import { getAllJobs } from '../Redux/jobSlice';

export default function JobsListing() {
    const [allJobs, setAllJobs] = useState();
    function getjobsData() {
        dispatch(getAllJobs())
          .then((response) => {
            setAllJobs(response.payload);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
      useEffect(() => {
     
        getjobsData();
      }, []);
  return (
    <div>{allJobs.map((item)=>{
      
    })}</div>
  )
}
