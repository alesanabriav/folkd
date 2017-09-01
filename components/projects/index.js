import ProjectsSection from './section';
import { connect } from 'react-redux';
import { selectProject, addProject, showCompleted } from '../../actions/projects';
import { getTodo, cleanTodo } from '../../actions/todos';

const mapStateToProps = state => {
  const todosAssignedCount = state.projects.todos.filter(todo => {
    return todo.assigned.id == state.users.current.id
    return false;
  });

  return {
    client: state.clients.selected,
  	projects: state.projects,
    todo: state.todos.item,
    currentUser: state.users.current,
    todosCount: state.projects.todos.length,
    todosAssignedCount: todosAssignedCount.length
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
