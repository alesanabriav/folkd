
const TYPE = 'CLIENTS';

const initialState = {
  items: [],
  loading: false,
  fail: false
};

export default function clients(state = initialState, action) {
  switch (action.type) {
    case `LOADING_${TYPE}`:
      return {...state, loading: true};
    case `FETCH_${TYPE}`:
      return {...state, items: action.payload, loading: false};
    case `ADD_${TYPE}`:
      return {...state, items: action.payload};
    case `UPDATE_${TYPE}`:
        return {...state, items: action.payload};
    case `FAIL_${TYPE}`:
      return {...state, fail: true};
    default:
      return state
  }
}
