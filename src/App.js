import React from 'react';
import './App.css';
import { Remarkable } from 'remarkable';
import { download, plain, pdf } from './Buttons';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.resetFile = this.resetFile.bind(this);
    this.state = { value: 'Hello, **world**!' };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  getRawMarkup() {
    const md = new Remarkable();
    return { __html: md.render(this.state.value) };
  }

  uploadFile(e) {
    const input = e.target;
    if ('files' in input && input.files.length > 0) {
      this.placeFileContent(
        document.getElementById('markdown-content'),
        input.files[0]);
    }
  }

  placeFileContent(target, file) {
    this.readFileContent(file).then(content => {
      target.value = content;
      this.setState({ value: content });
      }).catch(error => console.log(error));
  }

  readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result)
      reader.onerror = error => reject(error)
      reader.readAsText(file)
    });
  }

  resetFile(e) {
    e.target.value = "";
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
            <input type="file" onChange={this.uploadFile} onClick={this.resetFile} />
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
