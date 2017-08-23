
const TYPE = 'TODOS';

const initialState = {
  item: {},
  subitems: [],
  id: null,
  loading: false,
  fail: false
};

export default function todos(state = initialState, action) {
  switch (action.type) {
    case `FETCH_${TYPE}`:
      return { ...state, item: action.payload, loading: false };
    case `ADD_${TYPE}_SUBTODO`:
      return { ...state, items: action.payload };
    case `CLEAN_${TYPE}_ITEM`:
      return { ...state, item: {} };
    default:
      return state
  }
}
