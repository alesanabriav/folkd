import apolloFetch from '../lib/apollo_fetch';
import {
  getClientProjectsQuery,
  addProjectMutation
} from '../queries/projectQueries';

const TYPE = 'PROJECTS';
const failAction = { type: `FAIL_${TYPE}` };
const loadingAction = { type: `LOADING_${TYPE}` };

export function getProjects(variables) {
  const action = (dispatch) => {
    dispatch(loadingAction);
    return apolloFetch({ query: getClientProjectsQuery, variables })
    .then(res => {
      dispatch({ type: `FETCH_${TYPE}`, payload: res.data.projects });
      return res.data;
    })
    .catch(err => {
      dispatch( failAction );
    });
  }

  return action;
}

export function addProject(variables) {
  const action = (dispatch) => {
    dispatch(loadingAction);
    return apolloFetch({ query: addProjectMutation, variables })
    .then(res => {
      dispatch({ type: `ADD_${TYPE}`, payload: res.data.createProject });
      return res.data.createProject;
    })
    .catch(err => {
      dispatch( failAction );
    });
  }

  return action;
}

export function addProjectTodo(todo) {
  const action = (dispatch) => {
    return new Promise((resolve) => {
      dispatch({ type: `ADD_${TYPE}_TODO`, payload: todo });
      return resolve(todo);
    })
  }
  return action;
}

export function selectProject(project = {}) {
  const action = (dispatch) => {
    return new Promise((resolve) => {
      dispatch({ type: `SELECT_${TYPE}`, payload: project });
      return resolve(project);
    })
  }
  return action;
}

export function selectProjectById(id) {
  const action = (dispatch) => {
    return new Promise((resolve) => {
      dispatch({ type: `SELECT_${TYPE}_BY_ID`, payload: id });
      return resolve({ id });
    })
  }

  return action;
}

export function setClientId(id) {
  const action = (dispatch) => {
    return new Promise((resolve) => {
      dispatch({ type: `SET_${TYPE}_CLIENT_ID`, payload: id });
      return resolve({ id });
    })
  }
  return action;
}

export function showCompleted(is_completed = true) {
  const action = (dispatch) => {
    return new Promise((resolve) => {
      dispatch({ type: `SHOW_${TYPE}_COMPLETED`, payload: is_completed });
      return resolve({});
    })
  }
  return action;
}
