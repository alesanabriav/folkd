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

  setStateByUrlQuery = () => {
    const { query } = Router;
    if(query.hasOwnProperty('client') && query.hasOwnProperty('todo')) {
      this.props.selectClientById(query.client)
        .then(() => this.props.setClientId(query.client))
        .then(() => this.props.getProjects(this.props.projects.variables))
        .then(() => this.props.selectProjectById(query.project))
        .then(() => this.props.getTodo(query.todo))
        .catch(err => console.log('setStateByUrlQuery', err));
    }

  }

  fetchInitialData = () => {
    const { clients } = this.props;
    //
    this.props.getClients(clients.variables)
      // .then(clients => this.props.setClientId(clients[0].id))
      // .then(() => this.props.getProjects(this.props.projects.variables))
      .then(() => this.props.getUser())
      .then((user) => this.props.getAllProjects({todoWhere: {assign_id: user.id}}))
      .then(() => this.props.getUsers())
      .then(() => this.setStateByUrlQuery())
      .catch(err => console.log('fetchInitialData', err))
  }

  changeClient = (client) => {
    this.props.selectClient(client)
      .then(() => this.props.setClientId(client.id))
      .then(() => this.props.cleanTodo())
      .then(() => this.props.getProjects(this.props.projects.variables))
      .catch(err => console.log('changeClient', err));
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
  getAllProjects: actions.projects.getAllProjects,
  setClientId: actions.projects.setClientId,
  selectProjectById: actions.projects.selectProjectById,
  getUsers: actions.users.getUsers,
  getUser: actions.users.getUser,
  getTodo: actions.todos.getTodo,
  cleanTodo: actions.todos.cleanTodo
}

export default connect(state => state, mapDispatchToProps)(Dashboard);
