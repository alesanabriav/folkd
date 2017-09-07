import React, { Component } from 'react';


export class ClientForm extends Component {

  state = {
    name: '',
    abbreviation: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  cleanState = () => {
    this.setState({name: '', abbreviation: ''});
  }

  onCancel = (e) => {
    if(e) e.preventDefault();

  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state).then(() => {
      this.cleanState();
    });
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
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="abbreviation"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.abbreviation}
              placeholder="Shortname"
            />
          </div>

        <button className="btn btn-primary">Save</button>
        <button className="btn btn-secondary" onClick={this.onCancel}>Cancel</button>

        <style jsx>{`
          form {
            padding: 20px;
            background: rgba(0,0,0,.1);
            float: left;
            width: 100%;
            margin-bottom: 20px;
          }

          .btn-primary {
            margin-right: 10px;
          }

        `}</style>
      </form>
    );
  }
}

export default ClientForm;
