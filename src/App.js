import React from 'react';
import './App.css';
import { Remarkable } from 'remarkable';
import {download, plain, pdf, upload} from './Buttons';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: 'Hello, **world**!' };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
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
          <div className="DownloadButton">
            <button type="button" onClick={() => download(this.state.value)}>Download Markdown</button>
          </div>
          <div className="PlainButton">
            <button type="button" onClick={() => plain(this.state.value)}>Plain Markdown</button>
          </div>
          <div className="DownloadPDF">
          <button type="button" onClick={() => pdf(this.getRawMarkup())}>Download PDF</button>
          </div>
          <div className="UploadFile">
          <button type="button" onClick={() => upload(this.state.value)}>Upload File</button>
          </div>
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
