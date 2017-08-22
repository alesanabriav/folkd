import {
  getClientsQuery,
  createClientMutation,
  updateClientMutation,
} from '../queries/clientQueries';
import apolloFetch from '../lib/apollo_fetch';
const TYPE = 'CLIENTS';

const failAction = { type: `FAIL_${TYPE}` };
const loadingAction = { type: `LOADING_${TYPE}` };

export function getClients(variables) {
  const action = (dispatch) => {
    dispatch(loadingAction);

    return apolloFetch({ query: getClientsQuery, variables })
    .then(res => {
      dispatch({ type: `FETCH_${TYPE}`, payload: res.data.clients });
      return res;
    })
    .catch(err => dispatch( failAction ));
  }

  return action;
}

export function selectClient(client) {
  const action = (dispatch) => {
    return new Promise((resolve) => {
      dispatch({ type: `SELECT_${TYPE}`, payload: client });
      return resolve();
    })
  }

  return action;
}

export function addClient(variables) {
  const action = (dipatch) => {
    dispatch(loadingAction);
    apolloFetch({ getClientsQuery, variables })
    .then(res => {
      dispatch({ type: `ADD_${TYPE}`, payload: res });
      return res;
    })
    .catch(err => {
      dispatch( failAction );
    });
  }

  return action;
}

export function updateClient(variables) {
  const action = (dipatch) => {
    dispatch(loadingAction);
    apolloFetch({ getClientsQuery, variables })
    .then(res => {
      dispatch({ type: `UPDATE_${TYPE}`, payload: res });
      return res;
    })
    .catch(err => {
      dispatch( failAction );
    });
  }

  return action;
}
