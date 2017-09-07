import React, { Component } from "react";
import Router from 'next/router';
import Project from "./item";
import ProjectForm from "./form";

class Projects extends Component {
  state = {
    showForm: false,
    showSearch: false
  }

  selectProject = (project) => {
    this.props.cleanTodo()
      .then(() => this.props.selectProject(project))
  }

  changeTodo = (todo) => {
    const { client } = this.props;
    const { selected } = this.props.projects;
    const href = `/?client=${client.id}&project=${todo.project_id}&todo=${todo.id}`
    const as = href;
    Router.push(href, as, { shallow: true });

    this.props.selectProjectById(todo.project_id)
      .then(() => this.props.getTodo(todo.id));
  }

  toggleForm = (e) => {
    if(e) e.preventDefault();
    this.setState({ showForm: !this.state.showForm });
  }

  toggleSearch = (e) => {
    if(e) e.preventDefault();
    this.setState({ showSearch: !this.state.showSearch });
  }

  toggleCompleted = () => {
    this.props.showCompleted(!this.props.projects.filters.isCompleted);
  }

  addProject = (variables) => {
    this.props.addProject(variables);
  }

  renderLoading = () => {
    return (
      <section className="col-lg-4 col-md-3 projects">
        <h3 style={{color: '#fff', textAlign: 'center', marginTop: '20px'}}>loading...</h3>
      </section>
    );
  }

  render() {
    const { items, selected, todos, filters, loading } = this.props.projects;
    const { client, todo, currentUser, showCompleted } = this.props;
    const { showForm } = this.state;

    if(loading) return this.renderLoading();

    return (
      <section className="col-lg-4 col-md-3 projects">
        <header>
          <h5>Projects for {client.abbreviation}</h5>

           <div className="btns">
            <a href="" onClick={this.toggleForm}><i className="ion-plus"></i></a>
            <a href=""><i className="ion-search"></i></a>
          </div>
        </header>

        {showForm || !selected.hasOwnProperty('id') && client.hasOwnProperty('id')
          ? <ProjectForm client={client} onSubmit={this.addProject} onCancel={this.toggleForm} />
          : <div/>
        }

          <ul>
            {items.map(project =>
              <Project
                key={project.id}
                currentUser={currentUser}
                project={project}
                selected={selected}
                todoSelected={todo}
                filters={filters}
                onSelectProject={this.selectProject}
                onChangeTodo={this.changeTodo}
                onToggleCompleted={this.toggleCompleted}
              />
            )}
          </ul>

          <style jsx>{`
            .projects {
              background: rgba(0,0,0,.18);
              padding-top: 20px;
              height: calc(100vh - 60px);
              box-shadow: 0 3px 6px rgba(0,0,0,0.16);
              overflow-y: auto;
              padding: 0;
            }

            @media (max-width: 700px) {
              .projects {
                height: calc(20vh - 60px)
              }
            }

            .projects header {
              width: 100%;
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
              padding: 20px;
              box-shadow: 3px 3px 3px 0 rgba(0,0,0,.10);
              height: 70px;
            }

              .projects header h5 {
                font-weight: 300;
              }


            .btns a {
              font-size: 18px;
              color: #fff;
              margin-right: 10px;
            }

            .projects ul {
              margin: 20px 0;
            }

            .projects h5 {
              color: #fff;
            }
          `}</style>

      </section>
    );
  }
}

export default Projects;
