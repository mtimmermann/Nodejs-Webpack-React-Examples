import React from 'react';
import marked from 'marked';

/* eslint-disable react/no-multi-comp */
class Editor extends React.Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6">
        <EditorInput value={this.props.editInput} update={this.props.update} />
      </div>
    );
  }
}

class EditorInput extends React.Component {
  constructor(props) {
    super(props);

    this.update = this.update.bind(this);
  }

  update() {
    //const val = this.refs.inputValue.getDOMNode().value;
    const val = this.refs.inputValue.value;
    this.props.update(val);
  }

  render() {
    return (
      <textarea
        className="form-control"
        type="text"
        rows="30"
        ref="inputValue"
        value={this.props.value}
        onChange={this.update} />
    );
  }
}

//TODO: https://fb.me/prop-types-docs
EditorInput.propTypes = {
  update: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired
};

/* eslint-disable react/no-danger */
class Renderer extends React.Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6">
        <span dangerouslySetInnerHTML={this.props.renderMarkDown(this.props.rawInput)} />
      </div>
    );
  }
}

Renderer.propTypes = {
  renderMarkDown: React.PropTypes.func.isRequired,
  rawInput: React.PropTypes.string.isRequired
};


class MarkdownEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //value: this.getInitialVal()
      value:
        '# Header 1\n' +
        '## Header 2\n' +
        '### Header 3\n' +
        '#### Header 4\n\n' +
        '***\n' +
        ' * Bullet 1\n' +
        ' * Bullet 2\n' +
        ' + Bullet 3\n' +
        '***\n\n' +
        '[Inline link with title](https://www.google.com "Google\'s Homepage")\n\n' +
        '[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet "Markdown Cheatsheet on GitHub)\n\n' +
        '---\n\n' +
        '> Set Aside Markup\n\n' +
        '***\n\n' +
        '`code`\n\n' +
        '***\n\n' +
        '```\n' +
        'const Editor = React.createClass({\n' +
        '  render: function() {\n' +
        '    return (\n' +
        '      <div className="col-xs-12 col-sm-12 col-md-6">\n' +
        '        <EditorInput \n' +
        '          value={this.props.editInput}\n' +
        '          update={this.props.update} />\n' +
        '      </div>\n' +
        '```\n'
    };

    this.update = this.update.bind(this);
  }

  update(editValue) {
    this.setState({ value: editValue });
  }

  renderMarkDown(value) { // eslint-disable-line class-methods-use-this
    return {
      __html: marked(value, { sanitize: true })
    };
  }

  render() {
    return (
      <div className="row row-content">
        <Editor
          editInput={this.state.value}
          update={this.update} />
        <Renderer
          rawInput={this.state.value}
          renderMarkDown={this.renderMarkDown} />
      </div>
    );
  }
}

export default MarkdownEdit;
