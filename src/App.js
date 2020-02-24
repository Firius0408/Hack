import React from 'react';
import './App.css';
import { Remarkable } from 'remarkable';
import { download, plain, pdf } from './Buttons';
import Editor from './Editor';
import Preview from './Preview';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.resetFile = this.resetFile.bind(this);
    this.state = { value: 'Hello, **world**!' };
    this.getRawMarkup = this.getRawMarkup.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
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
      <div className="container">
        <header>
          <h1>Title</h1>
        </header>
        <div className="main-container">
          <Editor
            defaultValue={this.state.value}
            handleChange={this.handleChange}
          />
          <div className="button-list">
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
              <input id="upload" type="file" onChange={this.uploadFile} onClick={this.resetFile} hidden/>
              <button type="button" onClick={() => document.getElementById("upload").click()}>Upload File</button>
            </div>
          </div>
          <Preview
            getRawMarkup={this.getRawMarkup}
          />
        </div>
      </div>
    );
  }
}

export default App;
