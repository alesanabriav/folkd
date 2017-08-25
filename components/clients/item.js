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
        <a href='#' onClick={this.selectClient}><span>{client.abbreviation}</span> {client.name}</a>
        <style jsx>{`
          .clients__item {
            list-style: none;
          }

          .clients__item a {
            color: rgba(255,255,255, .6);
            width: 100%;
            display: block;
            background: rgba(0,0,0,.1);
            padding: 10px 20px;
            margin-bottom: 2px;
            transition: all .3s ease-in-out;
            overflow: hidden;
          }

          .clients__item a span {
            color: #fff;
            margin-right: 10px;
            font-weight: 500;
          }

          .clients__item a:hover {
            background: rgba(0,0,0,.2);
          }

          .clients__item--active a{
            background: rgba(0,0,0,.2);
          }

        `}</style>
      </li>
    );
  }
}

export default Client;
