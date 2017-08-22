import React, { Component } from "react";

class Project extends Component {
  selectProject = (e) => {
    e.preventDefault();
    this.props.selectProject(this.props.project);
  }

  changeTodo = (todoId, e) => {
    e.preventDefault();
    this.props.changeTodo(todoId);
  }

  render() {
    const { project = {}, selected = {} } = this.props;

    return (
      <li className={`projects__item ${project.id == selected.id ? 'projects__item--active' : ''}`}>
        <a href="#" onClick={this.selectProject}>
          <span className="projects__item__name">{project.name}</span>
          <span className="projects__item__todos-count">{project.todosCount}</span>
        </a>
        {project.todos.length > 0 ?
          <ul>
            {project.todos.map(todo =>
              <li key={todo.id}>
                <a href="#" onClick={this.changeTodo.bind(null, todo.id)}>{todo.title}</a>
              </li>
            )}
          </ul>
        : ''}
        <style jsx>{`
          .projects__item {
            list-style: none;
          }

          .projects__item > a {
            color: #fff;
            width: 100%;
            display: block;
            background: rgba(0,0,0,.1);
            padding: 10px 20px;
            margin-bottom: 2px;
            transition: all .3s ease-in-out;
          }

          .projects__item a:hover {
            background: rgba(0,0,0,.2);
          }

          .projects__item--active > a {
            background: rgba(0,0,0,.4);
          }

          .projects__item ul {

          }

          .projects__item ul li a {
            background: rgba(0,0,0,.1);
            padding: 10px 40px;
            display: block;
          }

        `}</style>
      </li>
    )
  }
}

export default Project;
