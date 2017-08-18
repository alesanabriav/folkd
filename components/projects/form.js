import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { 
  getClientProjectsQuery, 
  createProjectMutation, 
  updateProjectMutation 
} from '../../queries/projectQueries';

class ProjectForm extends Component {
  state = {
      name: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  updateProjects = (proxy, { data }) => {
    let variables = {
      clientId: this.props.client.selected.id,
      order: [["id", "DESC"]]
    };
    let query = getClientProjectsQuery;
    const queryData = proxy.readQuery({ query, variables }); 
    const projects = [data.createProject].concat(queryData.projects);
    
    proxy.writeQuery({ query, variables, data: { projects } });

  }

  handleSubmit = e => {
    e.preventDefault();
    const { name } = this.state;

    this.props.createProject({
      variables: {
        clientId: this.props.client.selected.id,
        name
      },
      update: this.updateProjects
    })
    .then(data => {
      this.setState({name: ""});
      this.props.onProjectAdded();
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="Project Name"
          />
        </div>
        
      </form>
    );
  }
}

export default compose(
  graphql(createProjectMutation, {name: 'createProject'}),
  graphql(updateProjectMutation, {name: 'updateProject'}),
)(ProjectForm);
