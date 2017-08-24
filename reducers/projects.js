
const TYPE = 'PROJECTS';

const initialState = {
  items: [],
  selected: {},
  todos: [],
  variables: {
    clientId: null,
    order: [['id', 'DESC']]
  },
  loading: false,
  fail: false
};

export default function projects(state = initialState, action) {
  switch (action.type) {
    case `FETCH_${TYPE}`:
      const selected = action.payload.length > 0 ? action.payload[0] : {};
      const todos = selected.todos ? selected.todos : [];

      return {
        ...state,
        items: action.payload,
        loading: false,
        selected,
        todos
      };
    case `SELECT_${TYPE}`:
      return {
        ...state,
        selected: action.payload,
        todos: action.payload.todos,
        loading: false
      };
    case `SET_${TYPE}_CLIENT_ID`:
      const variables = { ...state.variables, clientId: action.payload };
      return {
        ...state,
        variables
      };
    case `ADD_${TYPE}`:
      console.log(state.items);
      return { ...state, items: [action.payload].concat(state.items) };
    case `ADD_${TYPE}_TODO`:
      const todosUpdated = [action.payload].concat(state.todos);
      return { ...state, todos: todosUpdated };
    default:
      return state
  }
}
