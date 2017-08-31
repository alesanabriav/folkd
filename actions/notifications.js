import {
  getNotificationsQuery,
} from '../queries/notificationQueries';
import apolloFetch from '../lib/apollo_fetch';

const TYPE = 'NOTIFICATIONS';
const failAction = { type: `FAIL_${TYPE}` };
const loadingAction = { type: `LOADING_${TYPE}` };

export function getNotications(variables) {
  const action = (dispatch) => {
    dispatch(loadingAction);

    return apolloFetch({ query: getNotificationsQuery, variables })
    .then(res => {
      dispatch({ type: `FETCH_${TYPE}`, payload: res.data.notifications });
      return res;
    })
    .catch(err => dispatch( failAction ));
  }

  return action;
}
