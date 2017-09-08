import apolloFetch from '../lib/apollo_fetch';
import { getUsersQuery, getUserQuery } from './queries/usersQueries';

const TYPE = 'USERS';
const failAction = { type: `FAIL_${TYPE}` };
const loadingAction = { type: `LOADING_${TYPE}` };

export function getUsers(variables = {}) {
  const action = (dispatch) => {
    dispatch(loadingAction);

    return apolloFetch({ query: getUsersQuery, variables })
    .then(res => {
      dispatch({ type: `FETCH_${TYPE}`, payload: res.data.users });
      return res;
    })
    .catch(err => dispatch( failAction ));
  }

  return action;
}

export function getUser() {
  const action = (dispatch) => {
    dispatch(loadingAction);

    return apolloFetch({ query: getUserQuery })
    .then(res => {
      dispatch({ type: `FETCH_${TYPE}_CURRENT`, payload: res.data.user });
      return res;
    })
    .catch(err => dispatch( failAction ));
  }

  return action;
}
