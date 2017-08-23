import { combineReducers } from 'redux';
import clients from './clients';
import projects from './projects';
import todos from './todos';
import users from './users';

export default combineReducers({
  clients,
  projects,
  todos,
  users
});
