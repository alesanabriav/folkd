
const TYPE = 'CLIENTS';

const initialState = {
  items: [],
  selected: {},
  variables: { order: [['id', 'DESC']] },
  loading: false,
  fail: false
};

export default function clients(state = initialState, action) {
  switch (action.type) {
    case `LOADING_${TYPE}`:
      return {...state, loading: true};
    case `FETCH_${TYPE}`:
      return {
        ...state,
        items: action.payload,
        selected: action.payload.length > 0 ? action.payload[0] : {},
        loading: false
      };
    case `ADD_${TYPE}`:
      return {...state, items: action.payload};
    case `UPDATE_${TYPE}`:
        return {...state, items: action.payload};
    case `SELECT_${TYPE}`:
      return {...state, selected: action.payload};
    case `FAIL_${TYPE}`:
      return {...state, fail: true};
    default:
      return state
  }
}
