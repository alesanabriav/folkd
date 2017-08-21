import React, { Component } from "react";
import Project from "./item";
import ProjectForm from "./form";

class Projects extends Component {
  state = {
    showForm: false
  }

  selectProject = (project) => {
    //select first todo on select project if has todos
    this.props.dispatch({type: 'SELECT_PROJECT', payload: project});
    this.props.dispatch({type: 'SELECT_PROJECT_TODO', payload: null});
  }

  changeTodo = (todoId) => {
    this.props.dispatch({type: 'SELECT_PROJECT_TODO', payload: todoId});
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
    const { items, client, selected, loading } = this.props.projects;
    // const { projects = [] } = data;
    // const { selected } = project;
    // if(loading) return this.renderLoading();

    console.log(this.props.projects);

    return (
      <section className="col-lg-3 projects">
        <header>
          <h5>Projects</h5>
           <div className="btns">
            <button onClick={this.toggleForm} className="btn btn-link"><i className="ion-plus"></i></button>
            <button className="btn btn-link"><i className="ion-search"></i></button>
          </div>
        </header>
        {/* {this.state.showForm ? <ProjectForm client={client} onProjectAdded={this.handleProjectAdded} /> : <div/>} */}

          <ul>
            {/* {items.map(project =>
              <Project
                key={project.id}
                project={project}
                selected={selected}
                selectProject={this.selectProject}
                changeTodo={this.changeTodo}
                />
            )} */}
          </ul>

          <style jsx>{`
            .projects {
              background: rgba(0,0,0,.4);
              padding-top: 20px;
              height: 100vh;
              box-shadow: 0 3px 6px rgba(0,0,0,0.16)
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
