import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Map from './components/Map';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App />, document.querySelector('.container'));
ReactDOM.render(<Map />, document.querySelector('.mapcontainer'));
registerServiceWorker();
