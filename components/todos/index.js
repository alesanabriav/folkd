import { connect } from 'react-redux';
import moment from 'moment';
import Todos from './section';
import { addTodo, addTodoStep, addTodoAttachment } from '../../actions/todos';
import { addProjectTodo } from '../../actions/projects';

const mapStateToProps = state => {
  const now = moment();
  const start = moment(state.todos.item.deadline_start);
  const end = moment(state.todos.item.deadline_end);
  const deadline_days = end.diff(start, 'days');
  const deadline_current = end.diff(now, 'days') == 0 && end.diff(now, 'hours') > 0
    ? 1
    : end.diff(now, 'days');

  return {
    client: state.clients.selected,
  	project: state.projects.selected,
  	todo: {...state.todos.item, deadline_days, deadline_current},
  	steps: state.todos.steps,
  	attachments: state.todos.attachments,
    users: state.users.items,
    user: state.users.current
  }
};

const mapDispatchToProps = {
  addTodo,
  addProjectTodo,
  addTodoStep,
  addTodoAttachment
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
