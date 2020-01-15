import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'leaflet/dist/leaflet.css'
import { extendControlPositions } from './leaflet/control-positions';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { ClockSource } from './clock';
import { WebSocketManager } from './util/websocket';

extendControlPositions();
export const webSocketManager = new WebSocketManager('ws://localhost:8006')

/*
webSocketManager.addOnOpenCallback(async (event: Event) => {
  if (!webSocketManager.client) return
  webSocketManager.client.send(JSON.stringify({
    request: 'time',
    param: {}
  }))
})
*/

webSocketManager.connect()

export const clockSource = new ClockSource()

/*
webSocketManager.addOnMessageCallback(async (event: WebSocketMessageEvent) => {
  clockSource.timeDiff = 
})
*/

clockSource.start()

window.addEventListener('unload', (_event) => {
  webSocketManager.disconnect()
  clockSource.stop()
})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
