import ProjectsSection from './section';
import { connect } from 'react-redux';

// const projectsWithData = graphql(getClientProjectsQuery, {
//   options: props => ({
//     variables: {
//       clientId: props.client.selected.id,
//       order: [["id", "DESC"]]
//     }
//   }),
//    skip: props => {
//     return !props.client.selected.hasOwnProperty('id') ? true : false;
//   }
// })(ProjectsSection);

const mapStateToProps = state => ({
  client: state.clients.selected,
	projects: state.projects
});

export default connect(mapStateToProps)(ProjectsSection);
