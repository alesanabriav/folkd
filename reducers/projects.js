
const TYPE = 'PROJECTS';

const initialState = {
  items: [],
  loading: false,
  fail: false
};

export default function projects(state = [], action) {
  switch (action.type) {
    case `FETCH_${TYPE}`:
      return {...state, items: action.payload, loading: false};
    case `ADD_${TYPE}`:
      return {...state, items: action.payload};
    default:
      return state
  }
}
