const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'JOBS_STATUS':
      return [action.jobs];
    case 'JOB_REMOVE':
      return [state[0].filter(({ id }) => id !== action.id)];

    default:
      return state;
  }
};
