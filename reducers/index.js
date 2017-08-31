import { combineReducers } from 'redux';
import clients from './clients';
import projects from './projects';
import todos from './todos';
import users from './users';
import notifications from './notifications';

export default combineReducers({
  clients,
  projects,
  todos,
  users,
  notifications
});
