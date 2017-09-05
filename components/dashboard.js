import React, { Component } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import actions from '../actions';
import Clients from './clients';
import Projects from './projects';
import Todos from './todos';

class Dashboard extends Component {

  componentDidMount() {
    this.fetchInitialData();
  }

  fetchInitialData = () => {

    this.props.getClients(this.props.clients.variables)
    .then(action => {
      const { clients } = action.data;
      if(clients.length > 0) {
        return this.props.setClientId(this.props.clients.selected.id);
      }
    })
    .then(() => {
      return this.props.getUser();
    })
    .then(() => {
      return this.props.getProjects(this.props.projects.variables);
    })
    .then(() => {
      return this.props.getUsers();
    })
    .then(() => {
      console.log(Router.query);
      if(Router.query.hasOwnProperty('client')) {
        this.props.selectClientById(Router.query.client);
        this.props.setClientId(Router.query.client).then(() => {
          this.props.getProjects(this.props.projects.variables).then(() =>{
            this.props.getTodo(Router.query.todo);
          })
        });
      }
    })

  }

  changeClient = (client) => {
    this.props.selectClient(client)
    .then(() => {
      return this.props.setClientId(client.id);
    })
    .then(() => {
      return this.props.cleanTodo();
    })
    .then(() => {
      this.props.getProjects(this.props.projects.variables)
    })
  }

  render() {

    return (
      <div className="row">
        <Clients onChangeClient={this.changeClient} />
        <Projects />
        <Todos />
      </div>
    )
  }
}

const mapDispatchToProps = {
  getClients: actions.clients.getClients,
  selectClient: actions.clients.selectClient,
  selectClientById: actions.clients.selectClientById,
  getProjects: actions.projects.getProjects,
  setClientId: actions.projects.setClientId,
  getUsers: actions.users.getUsers,
  getUser: actions.users.getUser,
  getTodo: actions.todos.getTodo,
  cleanTodo: actions.todos.cleanTodo
}

export default connect(state => state, mapDispatchToProps)(Dashboard);
