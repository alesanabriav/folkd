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

  handleCancel = e => {
    if(e) e.preventDefault();
    this.props.onCancel();
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

        <button className="btn btn-primary btn-sm">Save</button>
        <button onClick={this.handleCancel} className="btn btn-secondary btn-sm">Cancel</button>

        <style jsx>{`
          form {
            padding: 0 20px;
            width: 100%;
            margin-bottom: 20px;
          }

          button {
            padding: 7px 15px;
            font-size: 14px;
          }

          .btn-primary {
            margin-right: 10px;
          }

        `}</style>

      </form>
    );
  }
}

export default ProjectForm;
