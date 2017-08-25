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
      return { ...state, items: [action.payload].concat(state.items) };
    case `UPDATE_${TYPE}`:
        return { ...state, items: action.payload };
    case `SELECT_${TYPE}`:
      return { ...state, selected: action.payload };
    case `SELECT_${TYPE}_BY_ID`:
      let selected = state.items.filter(item => item.id == action.payload);
      selected = selected.length > 0 ? selected[0] : {};
      return {...state, selected };
    case `FAIL_${TYPE}`:
      return { ...state, fail: true };
    default:
      return state
  }
}
