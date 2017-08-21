import React, { Component } from 'react';
import Client from './item';
import ClientForm from './form';
import SearchClient from './search';

class Clients extends Component {

  state = {
    showForm: false,
    showSearch: false
  }

  componentDidMount() {
    const variables = {
      order: [['id', 'DESC']]
    };
    this.fetchClients(variables);
  }

  fetchClients = (variables) => {
    this.props.getClients(variables)
    .then(action => {
      const { clients } = action.data;
      if(clients.length > 0) {
        const projectsVariables = {
          clientId: clients[0].id,
          order: [["id", "DESC"]]
        };
        this.props.getProjects(projectsVariables);
      }
    })
  }

  selectClient = client => {
    this.props.selectClient(client)
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
    const { items = [], selected, loading } = this.props.clients;
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
        <ul className="clients__list">
          {items.map(client =>
            <Client
              key={client.id}
              client={client}
              selectClient={this.selectClient}
              selected={selected}
            />
          )}
        </ul>
        <style jsx>{`
          .clients {
            background: rgba(0,0,0,.2);
            padding-top: 20px;
            height: 100vh;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16)
          }

          .clients h5 {
            color: #fff;
          }

          .clients__list {
            margin: 20px -15px;
          }
        `}</style>
      </section>
    )
  }
}

export default Clients;
