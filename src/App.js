import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Inicio from './components/Inicio'
import Sobre from './components/Sobre'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className='container'>
            <Route exact path='/' component={Inicio} />
            <Route exact path='/sobre' component={Sobre} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
