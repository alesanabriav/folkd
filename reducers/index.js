import { combineReducers } from 'redux';
import clients from './clients';
import projects from './projects';
import todos from './todos';

export default combineReducers({
  clients,
  projects,
  todos
});
