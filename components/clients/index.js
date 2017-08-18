import { getClientsQuery } from '../../queries/clientQueries';
import ClientsSection from './section';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

const ClientsWithData = graphql(getClientsQuery, {
  options: props => ({
    variables: {
      order: [['id', 'DESC']]
    }
  })
})(ClientsSection);

const mapStateToProps = state => ({
  client: state.client
});

export default connect(mapStateToProps)(ClientsWithData);