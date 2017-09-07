import React, { Component } from 'react';
import Client from './item';
import ClientForm from './form';
import SearchClient from './search';

class Clients extends Component {

  state = {
    showForm: false,
    showSearch: false
  }

  selectClient = client => {
    this.props.onChangeClient(client);
  }

  addClient = (variables) => {
    return this.props.addClient(variables);
  }

  toggleForm = (e) => {
    if(e) e.preventDefault();
    this.setState({showForm: !this.state.showForm});
  }

  toggleSearch = (e) => {
    e.preventDefault();
    this.setState({showSearch: !this.state.showSearch});
  }

  renderLoading = () => {
    return (
      <section className="col-lg-2 col-md-3 clients">
        <h3 style={{color: '#fff', textAlign: 'center', marginTop: '20px'}}>loading...</h3>
      </section>
    )
  }

  render() {
    const { items = [], selected, loading } = this.props.clients;
    const { showSearch, showForm } = this.state;
    if(loading) return this.renderLoading();

    return (
      <section className="col-lg-2 col-md-3 clients">
        <header>
          <h5>Clients</h5>
          <div className="btns">
            <a href="#" onClick={this.toggleForm}><i className={showForm ? "ion-close" : "ion-plus"}></i></a>
            <a href="#" onClick={this.toggleSearch}><i className="ion-search"></i></a>
          </div>
        </header>

        {showForm ? <ClientForm onSubmit={this.addClient} onCancel={this.toggleForm} /> : <div/>}

        {showSearch ? <SearchClient /> : <div/>}

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
            height: calc(100vh - 60px);
            box-shadow: 0 0 15px rgba(0,0,0, 0.20);
            overflow-y: auto;
            padding: 0;
          }

          @media (max-width: 700px) {
            .clients {
              height: calc(20vh - 60px)
            }
          }

          .clients header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            box-shadow: 3px 3px 3px 0 rgba(0,0,0,.10);
            height: 70px;
          }

          .clients header h5 {
            font-weight: 300;
          }

          .btns a {
            font-size: 18px;
            color: #fff;
            margin-right: 10px;
          }

          .btns button {
            margin-left: 10px;
            cursor: pointer;
          }

          .clients h5 {
            color: #fff;
          }

          .clients__list {
            margin: 20px 0;
          }
        `}</style>
      </section>
    )
  }
}

export default Clients;
