import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import Counter from './component/Counter';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
    <div>
      <Counter />
    </div>
  </Provider>
  );
}

export default App;
