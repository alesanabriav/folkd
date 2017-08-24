import React, { Component } from "react";
import fecha from 'fecha';
import TodoForm from './form';
import StepForm from './stepForm';

class Todos extends Component {

  handleSubmit = (variables) => {
    this.props.addTodo(variables).then((todo) => {
      this.props.addProjectTodo(todo);
    })
  }

  renderLoading = () => {
    return (<section className="col-lg-6 todos"><h5>loading...</h5></section>);
  }

  render() {
    const { project, todo, users, loading } = this.props;
    if(loading) return this.renderLoading();

    return (
      <section className="col-lg-6 todos">
        <header>
          <h5>{project.id ? `Task for ${project.name}` : 'Select a project'}</h5>
        </header>

        <section>
          { project.hasOwnProperty('id') && !todo.hasOwnProperty('id') ?
            <TodoForm
              selectTodo={this.selectTodo}
              users={users}
              todo={todo}
              project={project}
              onSubmit={this.handleSubmit}
            />
            : <div/>
          }
        </section>

        <div className="todos-items">
        {
          todo.hasOwnProperty('id') ?
          <div>
            <h2>{todo.title}</h2>
            <section className="todo__item">
              <header>
                <span>Assigned: {todo.assigned.name}</span>
                <span>step: {fecha.format(new Date(todo.created_at), 'DD-MM-YY HH:mm:ss')}</span>
              </header>
              <div className="todo__item__content">
                {todo.content}
              </div>
            </section>
          </div>
          : <div/>
        }

        {todo.steps && todo.steps.map((subtodo, ind) =>
          <section key={ind} className="todo__item">
            <header>
              <span>Assigned: {todo.assigned.name}</span>
              <span>Step: {fecha.format(new Date(subtodo.created_at), 'DD-MM-YYYY HH:mm:ss')}</span>
            </header>
             <div className="todo__item__content">
              {subtodo.content}
            </div>
          </section>
        )}
        </div>

        {todo.hasOwnProperty('id') ? <StepForm todo={todo} project={project} /> : <div/>}

        <style jsx>{`
          .todos {
            background: rgba(0,0,0,.6);
            padding-top: 20px;
            height: calc(100vh - 60px);
            color: #fff;
            overflow-y: auto;
          }

          .todos h5 {
            color: #fff;
            margin-bottom: 20px
          }

          .todos-items {
            margin-top: 20px;
          }

          .todo__item {
            padding: 10px 20px;
            background: rgba(255,255,255, .1);
            margin-bottom: 4px;
            margin-bottom: 20px;
          }

          .todo__item header {
            font-size: 13px;
            margin-bottom: 10px;
          }

          .todo__item header span {
            display: block;
          }
        `}</style>
      </section>
    );
  }
}

export default Todos;
