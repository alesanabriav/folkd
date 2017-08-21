import ClientsSection from './section';
import { getClients, selectClient } from '../../actions/clients';
import { getProjects } from '../../actions/projects';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { clients: state.clients };
}

const mapDispatchToProps = {
  getClients,
  selectClient,
  getProjects
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsSection);
