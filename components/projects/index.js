import ProjectsSection from './section';
import { connect } from 'react-redux';
import { selectProject, addProject } from '../../actions/projects';
import { getTodo, cleanTodo } from '../../actions/todos';

const mapStateToProps = state => ({
  client: state.clients.selected,
	projects: state.projects,
  todo: state.todos.item,
  currentUser: state.users.current
});

const mapDispatchToProps = {
  getTodo,
  cleanTodo,
  selectProject,
  addProject
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsSection);
