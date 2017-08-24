import React, { Component } from "react";

class ProjectForm extends Component {
  state = {
    name: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    const variables = {
      clientId: this.props.client.id,
      name
    };

    this.props.onSubmit(variables);
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

export default ProjectForm;
