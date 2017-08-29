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
        <a href='#' onClick={this.selectClient}>
          {client.abbreviation} <span className="clients__item__name">{client.name}</span>
        </a>
        <style jsx>{`
          .clients__item {
            list-style: none;
          }

          .clients__item a {
            width: 100%;
            height: 40px;
            display: block;
            background: rgba(0,0,0,.1);
            padding: 10px 20px;
            margin-bottom: 2px;
            transition: all .3s ease-in-out;
            overflow: hidden;
            white-space:nowrap;
            color: #fff;
            position: relative;
            font-weight: 500;
          }

          .clients__item__name {
            color: rgba(255,255,255, .4);
            margin-left: 10px;
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
