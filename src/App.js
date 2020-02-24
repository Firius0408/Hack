import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Remarkable } from 'remarkable';
import Editor from './Editor.js';
import Preview from './Preview.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getRawMarkup = this.getRawMarkup.bind(this);
    this.state = { value: '*Alvin* **Nguyen**' };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  getRawMarkup() {
    const md = new Remarkable();
    return { __html: md.render(this.state.value) };
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
            <div>
              <button>Placeholder 1</button>
            </div>
            <div>
              <button>Placeholder 2</button>
            </div>
            <div>
              <button>Placeholder 3</button>
            </div>
            <div>
              <button>Placeholder 4</button>
            </div>
            <div>
              <button>Placeholder 5</button>
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
