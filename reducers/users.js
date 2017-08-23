
const TYPE = 'USERS';

const initialState = {
  items: [],
  current: {},
  loading: false,
  fail: false
};

export default function todos(state = initialState, action) {
  switch (action.type) {
    case `FETCH_${TYPE}`:
      return {...state, items: action.payload, loading: false};
    case `GET_${TYPE}_CURRENT`:
      return {...state, currents: action.payload, loading: false};
    case `ADD_${TYPE}`:
      return {...state, items: action.payload};
    default:
      return state
  }
}
