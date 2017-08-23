import ProjectsSection from './section';
import { connect } from 'react-redux';
import { selectProject } from '../../actions/projects';
import { getTodo, cleanTodo } from '../../actions/todos';

const mapStateToProps = state => ({
  client: state.clients.selected,
	projects: state.projects,
  todo: state.todos.item
});

const mapDispatchToProps = {
  getTodo,
  cleanTodo,
  selectProject
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsSection);
