
const TYPE = 'USERS';

const initialState = {
  items: [],
  options: {
    baseColor: '#4A32D2'
  },
  current: {},
  loading: false,
  fail: false
};

export default function todos(state = initialState, action) {
  switch (action.type) {
    case `FETCH_${TYPE}`:
      return {...state, items: action.payload, loading: false};
    case `FETCH_${TYPE}_CURRENT`:
      return {...state, current: action.payload, loading: false};
    case `ADD_${TYPE}`:
      return {...state, items: action.payload};
    default:
      return state
  }
}
