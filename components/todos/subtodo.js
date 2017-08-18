import React, { Component } from "react";

class SubTodo extends Component {

  render() {
		const { subtodo } = this.props;

    return (
      <section style={{ color: "#333", margin: "20px 0" }}>
        <header style={{ background: "#fff", padding: "10px" }}>
          {subtodo.created_at ? fecha.format(Date.parse(subtodo.created_at), 'dddd MMMM DD, YYYY') : ''}
        </header>
        <article style={{ background: "#F1F3F7", padding: "20px" }}>
          <p>{subtodo.content}</p>
        </article>
      </section>
    );
  }
}

export default SubTodo;