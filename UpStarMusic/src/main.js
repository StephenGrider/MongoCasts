import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { Db, Server } from 'mongodb';
import reducers from './reducers';
import Routes from './router';
import mongoose from 'mongoose';
import './seeds';

mongoose.Promise = Promise;

const App = () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

const db = new Db('upstar_music', new Server('localhost', 27017));
db.open()
  .then(() => {
    window.db = db;
    mongoose.connect('mongodb://localhost/upstar_music');
      mongoose.connection
        .once('open', () => {
          ReactDOM.render(<App />, document.getElementById('root'));
        })
        .on('error', (error) => {
          console.warn('Warning', error);
        });
  });
