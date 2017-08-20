// import { getClientsQuery } from '../../queries/clientQueries';
import ClientsSection from './section';
import { connect } from 'react-redux';

// const ClientsWithData = graphql(getClientsQuery, {
//   options: props => ({
//     variables: {
//       order: [['id', 'DESC']]
//     }
//   })
// })();
//
// const mapStateToProps = state => ({
//   client: state.client
// });

export default connect(state => state)(ClientsSection);
