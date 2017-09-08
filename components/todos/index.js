import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import differenceInDays from 'date-fns/difference_in_days';
import differenceInHours from 'date-fns/difference_in_hours';

import Todos from './section';

import {
  addTodo,
  completeTodo,
  addTodoStep,
  addTodoAttachment,
  addStepAttachment,
  uploadingTodoAttachment,
  updateTodoAttachment
} from '../../actions/todos';

import { addProjectTodo } from '../../actions/projects';
import { addNotification } from '../../actions/notifications';

const startSelector = state => {
  const now = new Date();
  const start = state.todos.item.hasOwnProperty('deadline_start')
    ? state.todos.item.deadline_start
    : now;

  return start;
};

const endSelector = state => {
  const now = new Date();
  const end = state.todos.item.hasOwnProperty('deadline_end')
    ? state.todos.item.deadline_end
    : now;

  return end;
};

const deadline_days = createSelector(
  startSelector,
  endSelector,
  (start, end) => {
    return differenceInDays(end, start)  > 0 ?  differenceInDays(end, start) : 1
  }
);

const deadline_current = createSelector(
  endSelector,
  (end) => {
    const now = new Date();
    return differenceInDays(end, now) > 0 ? differenceInDays(end, now) : 1
  }
)

const mapStateToProps = state => {
  return {
    client: state.clients.selected,
  	project: state.projects.selected,
  	todo: state.todos.item,
  	steps: state.todos.steps,
  	attachments: state.todos.attachments,
    assigned: state.todos.assigned,
    users: state.users.items,
    user: state.users.current,
    uploading: state.todos.uploading,
    deadline_days: deadline_days(state),
    deadline_current: deadline_current(state)
  }
};

const mapDispatchToProps = {
  addTodo,
  completeTodo,
  addProjectTodo,
  addTodoStep,
  addTodoAttachment,
  addStepAttachment,
  updateTodoAttachment,
  uploadingTodoAttachment,
  addNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
