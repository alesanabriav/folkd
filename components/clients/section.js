import React, { Component } from 'react';
import Router from 'next/router';
import Client from './item';
import ClientForm from './form';
import SearchClient from './search';

class Clients extends Component {

  state = {
    showForm: false,
    showSearch: false
  }

  selectClient = client => {
    const href = `/?client=${client.id}`
    Router.push(href, href, { shallow: true })
    this.props.onChangeClient(client);
  }

  addClient = (variables) => {
    return this.props.addClient(variables);
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
    return (<section className="col-lg-3 clients"><h1>loading...</h1></section>)
  }

  render() {
    const { items = [], selected, loading } = this.props.clients;
    if(loading) return this.renderLoading();

    return (
      <section className="col-lg-2 col-md-3 clients">
        <header>
          <h5>Clients</h5>
          <div className="btns">
            <button onClick={this.toggleForm} className="btn btn-outline-light btn-sm"><i className="ion-plus"></i></button>
            <button onClick={this.toggleSearch} className="btn btn-outline-light btn-sm"><i className="ion-search"></i></button>
          </div>
        </header>
        {this.state.showForm ? <ClientForm onSubmit={this.addClient} /> : <div/>}
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
            height: calc(100vh - 60px);
            box-shadow: 0 3px 6px rgba(0,0,0,0.16);
            overflow-y: auto;
          }

          .clients header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }

          .btns {
            display: flex;
            align-self: flex-end;
          }

          .btns button {
            margin-left: 10px;
            cursor: pointer;
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
