import { connect } from 'react-redux';
import Todos from './section';
import { addTodo, addTodoStep } from '../../actions/todos';
import { addProjectTodo } from '../../actions/projects';

const mapStateToProps = state => ({
  client: state.clients.selected,
	project: state.projects.selected,
	todo: state.todos.item,
	steps: state.todos.steps,
  users: state.users.items,
  user: state.users.current
});

const mapDispatchToProps = {
  addTodo,
  addProjectTodo,
  addTodoStep
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
