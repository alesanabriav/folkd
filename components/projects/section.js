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

  handleProjectAdded = () => {
    this.toggleForm();
  }

  renderLoading = () => {
    return (<section className="col-lg-3 projects"><h5>loading...</h5></section>);
  }

  render() {
    const { items, selected, todos, loading } = this.props.projects;
    const { client, todo } = this.props;

    if(loading) return this.renderLoading();

    return (
      <section className="col-lg-3 projects">
        <header>
          <h5>Projects {client.name}</h5>
           <div className="btns">
            <button onClick={this.toggleForm} className="btn btn-link"><i className="ion-plus"></i></button>
            <button className="btn btn-link"><i className="ion-search"></i></button>
          </div>
        </header>

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
