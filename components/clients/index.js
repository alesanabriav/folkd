import ClientsSection from './section';
import { getClients, selectClient, addClient } from '../../actions/clients';
import { getProjects } from '../../actions/projects';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { clients: state.clients };
}

const mapDispatchToProps = {
  getClients,
  selectClient,
  addClient,
  getProjects
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsSection);
