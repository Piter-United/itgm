import React from 'react'
import ReactDOM from 'react-dom'
import '@babel/polyfill'

import App from './app/index'

const mountNode = document.getElementById('app')
ReactDOM.render(<App />, mountNode)
