import { getClientProjectsQuery } from '../../queries/projectQueries';
import ProjectsSection from './section';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

const projectsWithData = graphql(getClientProjectsQuery, {
  options: props => ({
    variables: {
      clientId: props.client.selected.id,
      order: [["id", "DESC"]]
    }
  }),
   skip: props => { 
    return !props.client.selected.hasOwnProperty('id') ? true : false;
  }
})(ProjectsSection);

const mapStateToProps = state => ({
  client: state.client,
	project: state.project
});

export default connect(mapStateToProps)(projectsWithData);