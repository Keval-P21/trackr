import { Job } from '../../interfaces/job';
import JobSummary from './JobSummary';

function JobList(
  { jobs,
    section,
    getUserJobs }:{
    jobs: Job[],
    section: String,
    getUserJobs: Function,
  
    }) {
  return jobs && jobs.length ? (
    <div>
      <h2 className='slim margin-bottom title-width'>{section}</h2>
      <div className='card-container'>
        {jobs
          .filter((job) => job.status === section.toLowerCase())
          .map((data) => {
            return (
              <JobSummary
                data ={data}
                key={data._id}
                getUserJobs={getUserJobs}
              />
            );
          })}
      </div>
      <br></br>
    </div>
  ) : (
    <div>
      <h2 className='slim'>{section}</h2>
      Add a job to start tracking
    </div>
  );
}

export default JobList;
