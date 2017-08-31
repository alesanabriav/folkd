const TYPE = 'NOTIFICATIONS';

const initialState = {
  items: [],
  variables: { order: [['id', 'DESC']] },
  loading: false,
  fail: false
};

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case `LOADING_${TYPE}`:
      return {...state, loading: true};
    case `FETCH_${TYPE}`:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case `ADD_${TYPE}`:
      return { ...state, items: [action.payload].concat(state.items) };
    case `REMOVE_${TYPE}_ITEM`:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    case `FAIL_${TYPE}`:
      return { ...state, fail: true };
    default:
      return state
  }
}
