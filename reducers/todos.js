
const TYPE = 'TODOS';

const initialState = {
  item: {},
  steps: [],
  id: null,
  loading: false,
  fail: false
};

export default function todos(state = initialState, action) {
  switch (action.type) {
    case `FETCH_${TYPE}`:
      return {
        ...state,
        item: action.payload,
        steps: action.payload.steps,
        loading: false
      };
    case `ADD_${TYPE}`:
      return {
        ...state,
        item: action.payload
      };
    case `ADD_${TYPE}_STEP`:
      const steps = [action.payload].concat(state.steps);
      return {
        ...state,
        steps
      };
    case `CLEAN_${TYPE}_ITEM`:
      return { ...state, item: {} };
    default:
      return state
  }
}
