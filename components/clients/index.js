import ClientsSection from './section';
import { getClients } from '../../actions/clients';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  getClients
}

export default connect(state => state, mapDispatchToProps)(ClientsSection);
