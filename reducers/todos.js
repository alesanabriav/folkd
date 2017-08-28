const TYPE = 'TODOS';

const initialState = {
  item: {},
  steps: [],
  attachments: [],
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
        attachments: action.payload.attachments,
        loading: false
      };
    case `ADD_${TYPE}`:
      return {
        ...state,
        item: action.payload
      };
    case `ADD_${TYPE}_STEP`:
      return {
        ...state,
        steps: [action.payload].concat(state.steps)
      };
    case `ADD_${TYPE}_ATTACHMENT`:
      return {
        ...state,
        attachments: [action.payload].concat(state.attachments)
      };
    case `CLEAN_${TYPE}_ITEM`:
      return { ...state, item: {}, steps: [], attachments: [] };
    default:
      return state
  }
}
