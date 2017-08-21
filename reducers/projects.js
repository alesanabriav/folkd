
const TYPE = 'PROJECTS';

const initialState = {
  items: [],
  selected: {},
  loading: false,
  fail: false
};

export default function projects(state = [], action) {
  switch (action.type) {
    case `FETCH_${TYPE}`:
    return {
      ...state,
      items: action.payload,
      selected: action.payload.length > 0 ? action.payload[0] : {},
      loading: false
    };
    case `ADD_${TYPE}`:
      return {...state, items: action.payload};
    default:
      return state
  }
}
