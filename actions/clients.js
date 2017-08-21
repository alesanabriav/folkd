import { createApolloFetch } from 'apollo-fetch';
import {
  getClientsQuery,
  createClientMutation,
  updateClientMutation,
} from '../queries/clientQueries';

const endpoint = 'http://api.githunt.com/graphql';
const apolloFetch = createApolloFetch({ endpoint });
const TYPE = 'CLIENTS';

const failAction = { type: `FAIL_${TYPE}` };
const loadingAction = { type: `LOADING_${TYPE}` };

export function getClients(variables) {
  const action = (dipatch) => {
    dispatch(loadingAction);
    apolloFetch({ getClientsQuery, variables })
    .then(res => {
      dispatch({type: `FETCH_${TYPE}`, payload: res });
      return res;
    })
    .catch(err => {
      dispatch( failAction );
    });
  }

  return action;
}

export function addClient(variables) {
  const action = (dipatch) => {
    dispatch(loadingAction);
    apolloFetch({ getClientsQuery, variables })
    .then(res => {
      dispatch({type: `ADD_${TYPE}`, payload: res });
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
      dispatch({type: `UPDATE_${TYPE}`, payload: res });
      return res;
    })
    .catch(err => {
      dispatch( failAction );
    });
  }

  return action;
}
