import { connect } from 'react-redux';
import Todos from './section';
import { addTodo } from '../../actions/todos';
import { addProjectTodo } from '../../actions/projects';

const mapStateToProps = state => ({
  client: state.clients.selected,
	project: state.projects.selected,
	todo: state.todos.item,
  users: state.users.items
});

const mapDispatchToProps = {
  addTodo,
  addProjectTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
