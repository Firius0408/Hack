import React from 'react';
import './App.css';
import { Remarkable } from 'remarkable';
import DownloadButton from './DownloadButton';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: 'Hello, **world**!' };
    this.DownloadButtonElement = React.createRef();
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.DownloadButtonElement.current.updateMarkdown(e.target.value);
  }

  getRawMarkup() {
    const md = new Remarkable();
    return { __html: md.render(this.state.value) };
  }

  render() {
    return (
      <div className="MarkdownEditor">
        <h3>Input</h3>
        <label htmlFor="markdown-content">
          Enter some markdown
        </label>
        <textarea
          id="markdown-content"
          onChange={this.handleChange}
          defaultValue={this.state.value}
        />
        <div className="Buttons">
          <DownloadButton markdown={this.state.value} ref={this.DownloadButtonElement} />
        </div>
        <h3>Output</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={this.getRawMarkup()}
        />
      </div>
    );
  }
}

export default App;
