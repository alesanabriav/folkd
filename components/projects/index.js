import ProjectsSection from './section';
import { connect } from 'react-redux';
import { getTodo } from '../../actions/todos';

const mapStateToProps = state => ({
  client: state.clients.selected,
	projects: state.projects,
  todo: state.todos.item 
});

const mapDispatchToProps = {
  getTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsSection);
