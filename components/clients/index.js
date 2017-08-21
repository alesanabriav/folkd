import ClientsSection from './section';
import { getClients, selectClient } from '../../actions/clients';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  getClients,
  selectClient
}

export default connect(state => state, mapDispatchToProps)(ClientsSection);
