import React, { Component } from "react";
import Project from "./item";
import ProjectForm from "./form";

class Projects extends Component {
  state = {
    showForm: false
  }

  selectProject = (project) => {
    this.props.cleanTodo()
    .then(() => {
      this.props.selectProject(project);
    })
  }

  changeTodo = (todoId) => {
    this.props.getTodo(todoId);
  }

  toggleForm = (e) => {
    if(e) e.preventDefault();
    this.setState({ showForm: !this.state.showForm });
  }

  addProject = (variables) => {
    this.props.addProject(variables);
  }

  renderLoading = () => {
    return (<section className="col-lg-3 projects"><h1>loading...</h1></section>);
  }

  render() {
    const { items, selected, todos, loading } = this.props.projects;
    const { client, todo } = this.props;
    const { showForm } = this.state;

    if(loading) return this.renderLoading();

    return (
      <section className="col-lg-3 projects">
        <header>
          <h5>Projects {client.name}</h5>
           <div className="btns">
            <button onClick={this.toggleForm} className="btn btn-outline-light btn-sm"><i className="ion-plus"></i></button>
            <button className="btn btn-outline-light btn-sm"><i className="ion-search"></i></button>
          </div>
        </header>
        {showForm || !selected.hasOwnProperty('id')  ? <ProjectForm client={client} onSubmit={this.addProject} /> : '' }
          <ul>
            {items.map(project =>
              <Project
                key={project.id}
                project={project}
                selected={selected}
                todos={todos}
                todoSelected={todo}
                onSelectProject={this.selectProject}
                onChangeTodo={this.changeTodo}
                />
            )}
          </ul>

          <style jsx>{`
            .projects {
              background: rgba(0,0,0,.4);
              padding-top: 20px;
              height: calc(100vh - 60px);
              box-shadow: 0 3px 6px rgba(0,0,0,0.16);
              overflow-y: auto;
            }

            .projects header {
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

            .projects ul {
              margin: 20px -15px;
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
