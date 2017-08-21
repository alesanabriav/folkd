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

  updateClients = (proxy, { data }) => {
    let variables = { order: [['id', 'DESC']] };

  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('create client');
    const variables = {
      name: this.state.name
    };

    this.props.addClient({variables})
    .then(this.cleanState());
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-inline">
        <div className="row">
          <div className="input-group col-lg-6">
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="Name"
            />
          </div>
          <div className="input-group col-lg-6">
            <input
              type="text"
              name="abbreviation"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.abbreviation}
              placeholder="Shortname"
            />
          </div>
        </div>
        <button style={{display: 'none'}}></button>
      </form>
    );
  }
}

export default ClientForm;
