import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app'
import { configAxios } from './config'

configAxios()

ReactDOM.render(<App />, document.getElementById('root'));
