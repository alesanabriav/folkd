import {
  getNotificationsQuery,
  addNotificationQuery,
  updateNotificationQuery
} from './queries/notificationQueries';
import apolloFetch from '../lib/apollo_fetch';

const TYPE = 'NOTIFICATIONS';
const failAction = { type: `FAIL_${TYPE}` };
const loadingAction = { type: `LOADING_${TYPE}` };

export function getNotifications(variables) {
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

export function addNotification(variables) {
  const action = (dispatch) => {
    return apolloFetch({ query: addNotificationQuery, variables })
    .then(res => {
      dispatch({ type: `ADD_${TYPE}_ITEM`, payload: res.data.createNotification });
      return res;
    })
    .catch(err => dispatch( failAction ));
  }

  return action;
}

export function removeNotification(variables) {
  variables = {...variables, is_read: true};

  const action = (dispatch) => {
    return apolloFetch({ query: updateNotificationQuery, variables })
    .then(res => {
      dispatch({ type: `REMOVE_${TYPE}_ITEM`, payload: res.data.updateNotification });
      return res;
    })
    .catch(err => dispatch( failAction ));
  }

  return action;
}
