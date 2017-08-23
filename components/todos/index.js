import { connect } from 'react-redux';
import Todos from './section';

const mapStateToProps = state => ({
  client: state.clients.selected,
	project: state.projects.selected,
	todo: state.todos.item
});

export default connect(mapStateToProps)(Todos);
