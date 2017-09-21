import React, { Component } from 'react';
import DOMPurify from 'dompurify';

class Editor extends Component {

  state = {
    bold: false,
    list: false,
    align: {},
    showFontsize: false,
    showTextAlign: false
  }

  componentDidMount() {
    const node = this.editorNode;
		const Squire = require('squire-rte');
		this.editor = new Squire(node);
		this.editor.addEventListener('keydown', (e) => {
      this.handleResult(this.editor.getHTML());
		});

    this.editor.addEventListener('input', () => {
      this.handleResult(this.editor.getHTML());
    });
  }

  handleResult = (html) => {
    const result = DOMPurify.sanitize(html);
    this.props.onChange(result);
  }

  handleFontSize = (sizeName, e) => {
    if(e) e.preventDefault();
    let size = '14px';
    if(sizeName == 'small') size = '10px';
    if(sizeName == 'normal') size = '14px';
    if(sizeName == 'large') size = '22px';
    this.editor.setFontSize(size);
    this.toggleFontSize();
  }

  handleBold = (e) => {
    e.preventDefault();
    this.setState({ bold: !this.state.bold });
    if(this.editor.hasFormat('b')) {
      this.editor.removeBold();
    } else {
      this.editor.bold();
    }
  }

  handleList = (e) => {
    e.preventDefault();
    this.setState({ list: !this.state.list });
    if(this.editor.hasFormat('ul') && this.editor.hasFormat('li')) {
      this.editor.removeList();
    } else {
      this.editor.makeUnorderedList();
    }
  }

  handleAlign = (position, e) => {
    e.preventDefault();
    console.log(this.editor.hasFormat('text-align: center'));
    this.editor.setTextAlignment(position);
    this.toggleTextAlign();
  }

  handleItalic = (e) => {
    if(e) e.preventDefault();
    this.editor.italic()
  }

  handleClean = (e) => {
    if(e) e.preventDefault();
    this.editor.removeAllFormatting();
  }

  toggleFontSize = (e) => {
    if(e) e.preventDefault();
    this.setState({ showFontsize: !this.state.showFontsize })
  }

  toggleTextAlign = (e) => {
    if(e) e.preventDefault();
    this.setState({ showTextAlign: !this.state.showTextAlign })
  }

  render() {
    return (
      <div>
        <div className="dropdown">
          <button className="btn btn-sm dropdown-toggle" onClick={this.toggleFontSize}>
            Font size
          </button>
          <div className={`dropdown-menu ${this.state.showFontsize ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" onClick={this.handleFontSize.bind(null, 'small')}>Small</a>
            <a className="dropdown-item" onClick={this.handleFontSize.bind(null, 'normal')}>Normal</a>
            <a className="dropdown-item" onClick={this.handleFontSize.bind(null, 'large')}>Large</a>
          </div>
        </div>

        <button className="btn btn-sm" onClick={this.handleBold}>Bold</button>
        <button className="btn btn-sm" onClick={this.handleItalic}>Italic</button>
        <button className="btn btn-sm" onClick={this.handleList}>List</button>
        <div className="dropdown">
          <button className="btn btn-sm dropdown-toggle" onClick={this.toggleTextAlign}>
            Text align
          </button>
          <div className={`dropdown-menu ${this.state.showTextAlign ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" onClick={this.handleAlign.bind(null, 'left')}>left</a>
            <a className="dropdown-item" onClick={this.handleAlign.bind(null, 'center')}>center</a>
            <a className="dropdown-item" onClick={this.handleAlign.bind(null, 'right')}>right</a>
          </div>
        </div>
        <button className="btn btn-sm" onClick={this.handleClean}>Clean</button>
        <div className="editor" ref={editor => this.editorNode = editor }></div>
        <style jsx>{`
          .editor {
            color: #333;
            min-height: 200px;
            background: #fff;
            padding: 20px;
          }

          .editor:focus {
            outline: none;
          }

          .dropdown {
            display: inline-block;
          }


        `}</style>
      </div>
    )
  }
}

export default Editor;
