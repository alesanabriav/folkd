import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { 
  createClientMutation, 
  updateClientMutation, 
  getClientsQuery 
} from '../../queries/clientQueries';

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
    let query = getClientsQuery;
    const queryData = proxy.readQuery({ 
      query,
      variables
    });
    
    const clients = [data.createClient].concat(queryData.clients);
    
    proxy.writeQuery({ 
      query,
      variables,
      data: { clients }
    });
  
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('create client');

    this.props.createClient({
      variables: {
        name: this.state.name
      },
      update: this.updateClients
    })
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

export default compose(
  graphql(createClientMutation, {name: 'createClient'}),
  graphql(updateClientMutation, {name: 'updateClient'}),
)(ClientForm);
