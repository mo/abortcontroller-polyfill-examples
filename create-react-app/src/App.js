import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Until "eslint" understands (via "globals" npm package) that "AbortController"
// is a global variable in the "browser" environment, we need this declaration
// as a workaround. See also:
// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#using-global-variables
const AbortController = window.AbortController;

class App extends Component {
  state = {
    loading: true,
    text: 0,
    color: '',
  }
  componentDidMount() {
    const controller = new AbortController();
    if (Math.random() < 0.5) {
      controller.abort();
    }
    fetch('https://api.github.com/repos/facebook/react', { signal: controller.signal })
      .then(r => r.json())
      .then(json => {
        this.setState({
          loading: false,
          msg: 'Request was not aborted: React has ' + json.stargazers_count + ' stars, hit CTRL-R to try again.',
          color: 'green',
        });
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          this.setState({
            loading: false,
            msg: 'fetch() request was aborted, hit CTRL-R to try again.',
            color: 'red',
          });
          return;
        }
        console.log(err);
      })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">abortcontroller-polyfill inside create-react-app</h1>
        </header>
        <p className="App-intro">
        When this page loads it makes a fetch() request to api.github.com to
        retrieve the number of stars for the 'react' repository. There is a
        50% chance that the request is aborted, so press CTRL-R multiple
        times to see both cases.
        </p>
        <p className="App-intro">
        Note: this example assumes that fetch() is already available in the
        browser; it will polyfill the AbortController class and modify the
        fetch() function so that it uses the abort signal passed to it.
        If you need to support browsers that does not implement fetch at all,
        like for example Internet Explorer 11, then you need to load a separate
        polyfill for that before loading the abortcontroller-polyfill.
        </p>
        <p className="App-fetch-results" style={{ color: this.state.color }}>
          { this.state.loading ? 'Loading...' : this.state.msg }
        </p>
      </div>
    );
  }
}

export default App;
