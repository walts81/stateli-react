# Stateli React

[![Build Status](https://travis-ci.com/walts81/stateli-react.svg?branch=master)](https://travis-ci.com/walts81/stateli-react)
[![Coverage Status](https://coveralls.io/repos/github/walts81/stateli-react/badge.svg)](https://coveralls.io/github/walts81/stateli-react)

A [React][react] library to enable [Stateli][stateli] to work with [React][react] and [Redux Dev Tools][reduxdevtools].

### Installation

Install stateli-react with npm.

```sh
$ npm install stateli stateli-react --save
```

### Usage

```javascript
// in React main component
import React from 'react';
import { StateliStore } from 'stateli';
import { StateliProvider } from 'stateli-react';
import App from './App.jsx'; // <-- your React app component

const store = new StateliStore({
  actions: [],
  mutations: [],
  getters: [],
  state: {},
});

export default class MainComponent extends React.Component {
  render() {
    return (
      <div>
        <StateliProvider store={store}>
          <App />
        </StateliProvider>
      </div>
    );
  }
}
```

## License

[MIT](LICENSE)

[react]: https://reactjs.org/
[redux]: https://redux.js.org/
[reduxdevtools]: https://github.com/reduxjs/redux-devtools
[stateli]: https://github.com/walts81/stateli
