import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import MapContainer from './components/MapContainer';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App />, document.querySelector('.container'));
ReactDOM.render(<MapContainer />, document.querySelector('.mapcontainer'));
registerServiceWorker();
