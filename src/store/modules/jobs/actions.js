export const jobsStatus = ({ jobs }) => ({
  type: 'JOBS_STATUS',
  jobs,
});

export const removeJob = ({ id }) => ({
  type: 'JOB_REMOVE',
  id,
});
