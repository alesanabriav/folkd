import React, { Component } from 'react';

class Client extends Component {
  selectClient = e => {
    e.preventDefault();
    this.props.selectClient(this.props.client);
  }

  render() {
    const { client, selected } = this.props;
    return (
      <li className={`clients__item ${client.id == selected.id ? 'clients__item--active' : ''}`}>
        <a href='#' onClick={this.selectClient}>{client.name}</a>
      </li>
    );
  }
}

export default Client;
