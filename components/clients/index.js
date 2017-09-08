import ClientsSection from './section';
import { getClients, selectClient, addClient } from '../../actions/clients';
import { getProjects, getAllProjects } from '../../actions/projects';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { clients: state.clients };
}

const mapDispatchToProps = {
  getClients,
  selectClient,
  addClient,
  getProjects,
  getAllProjects
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsSection);
