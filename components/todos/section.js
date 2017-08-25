import React, { Component } from "react";
import fecha from 'fecha';
import MarkdownIt from 'markdown-it';
import taskLists from 'markdown-it-task-lists';
import TodoForm from './form';
import StepForm from './stepForm';

class Todos extends Component {

  handleSubmit = (variables) => {
    this.props.addTodo(variables).then((todo) => {
      this.props.addProjectTodo(todo);
    })
  }

  handleSubmitStep = (variables) => {
    const { todo, steps } = this.props;
    variables = {...variables, todo_id: todo.id, position: steps.length + 1};
    return this.props.addTodoStep(variables);
  }

  renderMD(content) {
    const md = new MarkdownIt();
		md.use(taskLists);
		return md.render(content);
  }

  renderLoading = () => {
    return (<section className="col-lg-6 todos"><h5>loading...</h5></section>);
  }

  render() {
    const { project, todo, steps, users, user, loading } = this.props;
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
                <span>owner: {todo.author.id == user.id ? 'me' : todo.author.name}</span>
                <span>Assigned: {todo.assigned.name}</span>
                <span>step: {fecha.format(new Date(todo.created_at), 'DD-MM-YY HH:mm:ss')}</span>
                <button className="btn btn-outline-light btn-sm">Edit</button>
              </header>
              <div className="todo__item__content">
                <div dangerouslySetInnerHTML={{__html: this.renderMD(todo.content)}}/>
              </div>
            </section>
          </div>
          : <div/>
        }

        {steps && steps.map((subtodo, ind) =>
          <section key={ind} className="todo__item">
            <header>
              <span>step: {subtodo.position}</span>
              <span>owner: {subtodo.author.name}</span>
              <span>Step: {fecha.format(new Date(subtodo.created_at), 'DD-MM-YYYY HH:mm:ss')}</span>
            </header>
             <div className="todo__item__content">
               <div dangerouslySetInnerHTML={{__html: this.renderMD(subtodo.content)}}/>
            </div>
          </section>
        )}
        </div>

        { todo.hasOwnProperty('id') && (user.id == todo.author.id || user.id == todo.assigned.id)
          ? <StepForm onSubmit={this.handleSubmitStep} project={project} />
          : <div/> }

        <style jsx>{`
          .todos {
            background: rgba(0,0,0,.6);
            padding-top: 20px;
            height: calc(100vh - 60px);
            color: #fff;
            overflow-y: auto;
            position: relative;
          }

          .todos h5 {
            color: #fff;
            margin-bottom: 20px
          }

          .todos-items {
            margin-top: 20px;
          }

          .todo__item {
            background: rgba(255,255,255, .1);
            margin-bottom: 4px;
            margin-bottom: 20px;
          }

          .todo__item header {
            font-size: 13px;
            margin-bottom: 10px;
            padding: 10px 20px;
          }

          .todo__item header span {
            display: block;
          }

          .todo__item header button {
            display: inline-block;
            text-align: right;
          }

          .todo__item__content {
            background: rgba(255,255,255,.8);
            padding: 20px;
            color: #1F293B;
          }

        `}</style>
      </section>
    );
  }
}

export default Todos;
