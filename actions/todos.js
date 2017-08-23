import apolloFetch from '../lib/apollo_fetch';
import { getTodoQuery, addTodoMutation  } from '../queries/todoQueries';
const TYPE = 'TODOS';
const failAction = { type: `FAIL_${TYPE}` };
const loadingAction = { type: `LOADING_${TYPE}` };

export function getTodo(id) {
  const action = (dispatch) => {
    const variables = { id };
    apolloFetch({ query: getTodoQuery, variables })
    .then(res => {
      dispatch({ type: `FETCH_${TYPE}`, payload: res.data.todo });
      return res;
    });
  }

  return action;
}

export function addTodo(variables = {}) {
  const action = (dispatch) => {
    return apolloFetch({ query: addTodoMutation, variables })
    .then(res => {
      dispatch({ type: `ADD_${TYPE}`, payload: res.data.createTodo });
      return res.data.createTodo;
    });
  }

  return action;
}

export function cleanTodo() {
  const action = (dispatch) => {
    return new Promise((resolve) => {
      dispatch({ type: `CLEAN_${TYPE}_ITEM`});
      return resolve();
    });
  }

  return action;
}
