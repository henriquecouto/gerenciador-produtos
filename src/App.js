import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Inicio from './components/Inicio'
import Sobre from './components/Sobre'
import Produtos from './components/Produtos/index'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className='pl-3 pr-3'>
            <Route exact path='/' component={Inicio} />
            <Route exact path='/sobre' component={Sobre} />
            <Route path='/produtos' component={Produtos} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
