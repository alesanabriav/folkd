
const TYPE = 'PROJECTS';

const initialState = {
  items: [],
  selected: {},
  variables: {
    clientId: null,
    order: [["id", "DESC"]]
  },
  loading: false,
  fail: false
};

export default function projects(state = initialState, action) {
  switch (action.type) {
    case `FETCH_${TYPE}`:
      return {
        ...state,
        items: action.payload,
        selected: action.payload.length > 0 ? action.payload[0] : {},
        loading: false
      };
    case `SELECT_${TYPE}`:
      return {
        ...state,
        selected: action.payload,
        loading: false
      };
    case `SET_${TYPE}_CLIENT_ID`:
      const variables = {...state.variables, clientId: action.payload};
      return {
        ...state,
        variables
      };
    case `ADD_${TYPE}`:
      return {...state, items: action.payload};
    case `ADD_${TYPE}_TODO`:
      return { ...state, items: action.payload };
    default:
      return state
  }
}
