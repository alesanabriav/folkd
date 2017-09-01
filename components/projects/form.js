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
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="Project Name"
          />
        </div>
        <button className="btn btn-outline-light btn-sm">Save</button>

        <style jsx>{`
          form {
            padding: 20px;
            background: rgba(0,0,0,.1);

            width: 100%;
            margin-bottom: 20px;
          }

          button {

          }

        `}</style>

      </form>
    );
  }
}

export default ProjectForm;
