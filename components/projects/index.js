import ProjectsSection from './section';
import { connect } from 'react-redux';
import { selectProject, addProject, showCompleted } from '../../actions/projects';
import { getTodo, cleanTodo } from '../../actions/todos';

const mapStateToProps = state => {

  return {
    client: state.clients.selected,
  	projects: state.projects,
    todo: state.todos.item,
    currentUser: state.users.current
  }

};

const mapDispatchToProps = {
  getTodo,
  cleanTodo,
  selectProject,
  addProject,
  showCompleted
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsSection);
