const TYPE = 'TODOS';

const initialState = {
  item: {},
  steps: [],
  attachments: [],
  assigned: {},
  id: null,
  loading: false,
  uploading: false,
  fail: false
};

export default function todos(state = initialState, action) {
  switch (action.type) {
    case `LOADING_${TYPE}`:
      return {...state, loading: true};
    case `UPLOADING_${TYPE}_ATTACHMENT`:
      return {...state, uploading: true};
    case `FETCH_${TYPE}`:
      return {
        ...state,
        item: action.payload,
        steps: action.payload.steps,
        attachments: action.payload.attachments,
        assigned: action.payload.assigned.length > 0 ? action.payload.assigned[0].user : {},
        loading: false
      };
    case `ADD_${TYPE}`:
      return {
        ...state,
        item: action.payload
      };
      case `UPDATE_${TYPE}_ITEM`:
        return {
          ...state,
          item: {...state.item, ...action.payload}
        };
    case `ADD_${TYPE}_STEP`:
      return {
        ...state,
        steps: [action.payload].concat(state.steps)
      };
    case `ADD_${TYPE}_ATTACHMENT`:
      return {
        ...state,
        uploading: false,
        attachments: [action.payload].concat(state.attachments)
      };
    case `ADD_${TYPE}_STEP_ATTACHMENT`:
      const steps = state.steps.map(step => {
        if(step.id == action.payload.step_id) {
          return {...step, attachments: [action.payload].concat(step.attachments)};
        }
        return step;
      });

      return {
        ...state,
        uploading: false,
        steps
      };
    case `CLEAN_${TYPE}_ITEM`:
      return { ...state, item: {}, steps: [], attachments: [] };
    default:
      return state
  }
}
