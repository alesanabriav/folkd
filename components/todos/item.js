import React, { Component } from 'react';
import dateFns from 'date-fns';
import MarkdownIt from 'markdown-it';
import taskLists from 'markdown-it-task-lists';
import Upload from '../upload';

class Todo extends Component {

  renderMD(content) {
    const md = new MarkdownIt();
		md.use(taskLists);
		return md.render(content);
  }

  handleUploaded(files) {
    files.forEach(file => {
      this.props.addTodoAttachment(file);
    })
  }

  render() {
    const { todo, user, attachments } = this.props;
    const uploadData = { todo_id: todo.id, user_id: user.id };

    return (
      <section className="todo__item">
        <div className="todo__item__content">
          <div dangerouslySetInnerHTML={{__html: this.renderMD(todo.content)}}/>
        </div>
        <div className="todo__item__upload">

          <Upload data={uploadData} user={user} onUploaded={this.handleUploaded.bind(this)} />

          <ul className="todo__item__uploads">
            {attachments.map(attachment =>
              <li key={attachment.id}>
                <a target="blank" href={attachment.url}>{attachment.name}</a>
              </li>
            )}
          </ul>
        </div>

        <style jsx>{`
          .todo__item {
            background: rgba(255,255,255, .1);
            margin-bottom: 4px;
            margin-bottom: 20px;
          }

          .todo__item header {
            font-size: 13px;
            margin-bottom: 10px;
            padding: 10px 20px 0 20px;
            display: flex;
            align-items: center;
          }

          .todo__item header span {
            display: inline-block;
            margin-right: 10px;
          }

          .todo__item header span i {
            font-weight: 200;
          }

          .todo__item header button {
            display: inline-block;
            text-align: right;
          }

          .todo__item__content {
            background: #F7F7F7;
            padding: 20px;
            color: #1F293B;
          }

          .todo__item__upload {
            padding: 20px;
          }

          .todo__item__uploads {
            margin-top: 20px;
          }

          .todo__item__uploads a {
						color: #333;
					}

        `}</style>
      </section>
    )
  }
}

export default Todo;
