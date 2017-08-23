import { connect } from 'react-redux';
import Todos from './section';
import { addTodo } from '../../actions/todos';

const mapStateToProps = state => ({
  client: state.clients.selected,
	project: state.projects.selected,
	todo: state.todos.item,
  users: state.users.items
});

const mapDispatchToProps = {
  addTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
