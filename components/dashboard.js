import React, { Component } from 'react';
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
      this.props.getProjects(this.props.projects.variables);
    })
    .then(() => {
      this.props.getUser();
    })
    .then(() => {
      this.props.getUsers();
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
      <section className="row">
        <Clients onChangeClient={this.changeClient} />
        <Projects />
        <Todos />
      </section>
    )
  }
}

const mapDispatchToProps = {
  getClients: actions.clients.getClients,
  selectClient: actions.clients.selectClient,
  getProjects: actions.projects.getProjects,
  setClientId: actions.projects.setClientId,
  getUsers: actions.users.getUsers,
  getUser: actions.users.getUser,
  cleanTodo: actions.todos.cleanTodo
}

export default connect(state => state, mapDispatchToProps)(Dashboard);
