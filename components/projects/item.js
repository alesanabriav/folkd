import React, { Component } from "react";

export class Project extends Component {
  selectProject = (e) => {
    e.preventDefault();
    this.props.onSelectProject(this.props.project);
  }

  changeTodo = (todoId, e) => {
    e.preventDefault();
    this.props.onChangeTodo(todoId);
  }

  render() {
    const { project, selected, todos, todoSelected } = this.props;

    return (
      <li className={`projects__item ${project.id == selected.id ? 'projects__item--active' : ''}`}>
        <a href="#" onClick={this.selectProject}>
          <span className="projects__item__name">{project.name}</span>
          <span className={project.id == selected.id ? "projects__item__icon ion-chevron-down" : "projects__item__icon ion-chevron-right"}></span>
          <span className="projects__item__todos-count">{project.todosCount}</span>
        </a>

        {todos.length > 0 ?
          <ul className={project.id == selected.id ? "projects__todos projects__todos--open" :"projects__todos" }>
            {todos.map(todo =>
              <li key={todo.id} className={todo.id == todoSelected.id ? 'projects__todo--active' : '' }>
                <a href="#" onClick={this.changeTodo.bind(null, todo.id)}>{todo.title}</a>
              </li>
            )}
          </ul>
        : ''}

        <style jsx>{`
          .projects__item {
            list-style: none;
          }

          .projects__item__todos-count {
            float: right;
            margin-right: 10px;
            color: rgba(255,255,255, .6);
          }

          .projects__item__icon {
            float: right;
          }

          .projects__item > a {
            color: #fff;
            width: 100%;
            display: block;
            background: rgba(0,0,0,.2);
            padding: 10px 20px;
            margin-bottom: 2px;
            transition: all .3s ease-in-out;
          }

          .projects__item a:hover {
            background: rgba(0,0,0,.4);
          }

          .projects__item--active > a {
            background: rgba(0,0,0,.4);
          }

          .projects__item ul li a {
            background: rgba(0,0,0,.01);
            padding: 10px 40px;
            display: block;
          }

          .projects__todos {
            display: none;
            background: rgba(0,0,0,.1);
          }

          .projects__todos--open {
            display: block;
          }

          .projects__todo--active {
              background: rgba(0,0,0,.3);
          }

          .projects__todos li a {
            color: #fff;
            font-size: 14px;
            margin-bottom: 1px;
          }

        `}</style>
      </li>
    )
  }
}

export default Project;
