import { connect } from 'react-redux';
import differenceInDays from 'date-fns/difference_in_days';
import differenceInHours from 'date-fns/difference_in_hours';
import Todos from './section';
import {
  addTodo,
  completeTodo,
  addTodoStep,
  addTodoAttachment,
  addStepAttachment,
  uploadingTodoAttachment
} from '../../actions/todos';
import { addProjectTodo } from '../../actions/projects';
import { addNotification } from '../../actions/notifications';

const mapStateToProps = state => {
  // I need selectors to make this memoized
  const now = new Date();
  const start = state.todos.item.deadline_start;
  const end = state.todos.item.deadline_end;
  const deadline_days = differenceInDays(end, start);
  const deadline_current = differenceInDays(end, now) == 0 && differenceInHours(end, now) > 0
    ? 1
    : differenceInDays(end, now);

  return {
    client: state.clients.selected,
  	project: state.projects.selected,
  	todo: {...state.todos.item, deadline_days, deadline_current},
  	steps: state.todos.steps,
  	attachments: state.todos.attachments,
    users: state.users.items,
    user: state.users.current,
    uploading: state.todos.uploading
  }
};

const mapDispatchToProps = {
  addTodo,
  completeTodo,
  addProjectTodo,
  addTodoStep,
  addTodoAttachment,
  addStepAttachment,
  uploadingTodoAttachment,
  addNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
