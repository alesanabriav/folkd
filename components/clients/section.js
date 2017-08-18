import React, { Component } from 'react';
import Client from './item';
import ClientForm from './form';
import SearchClient from './search';

class Clients extends Component {
  state = {
    showForm: false,
    showSearch: false
  }

  componentWillReceiveProps(props) {
    if(!props.client.selected.hasOwnProperty('id') && props.data.clients.length > 0) {
      this.selectClient(props.data.clients[0]);
    }
  }
   
  selectClient = client => {
    this.props.dispatch({type: 'SELECT_CLIENT', payload: client});
  }

  toggleForm = (e) => {
    e.preventDefault();
    this.setState({showForm: !this.state.showForm});
  }

  toggleSearch = (e) => {
    e.preventDefault();
    this.setState({showSearch: !this.state.showSearch});
  }

  renderLoading = () => {
    return (<section className="col-lg-3 clients"><h5>loading...</h5></section>)
  }

  render() {
    const { clients = [], loading } = this.props.data;
    const { selected } = this.props.client;
    if(loading) return this.renderLoading();

    return (
      <section className="col-lg-3 clients">
        <header>
          <h5>Clients</h5>
          <div className="btns">
            <button onClick={this.toggleForm} className="btn btn-link"><i className="ion-plus"></i></button>
            <button onClick={this.toggleSearch} className="btn btn-link"><i className="ion-search"></i></button>
          </div>
        </header>
        {this.state.showForm ? <ClientForm /> : <div/>}
        {this.state.showSearch ? <SearchClient /> : <div/>}
        <ul className="clients--list">
          {clients.map(client =>
            <Client
              key={client.id}
              client={client}
              selectClient={this.selectClient}
              selected={selected}
            />
          )}
        </ul>
      </section>
    )
  }
}

export default Clients;