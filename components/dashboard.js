import React, { Component } from 'react';
import Clients from './clients';
import Projects from './projects';
import Todos from './todos';

class Dashboard extends Component {
  render() {
    return (
      <section className="row">
        <Clients />
        <Projects />
        <Todos />
      </section>
    )
  }
}

export default Dashboard;