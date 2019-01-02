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
  constructor(props) {
    super(props)
    this.state = {
      categorias: []
    }
    this.api = this.props.api
  }

  loadCategorias = () => {
    this.api.loadCategorias()
      .then(res => {
        this.setState({
          categorias: res.data
        })
      })
  }

  removeCategoria = v => {
    this.api.removeCategoria(v.id)
      .then(() => this.loadCategorias())
  }

  addCategoria = categoria => {
    this.api.addCategoria(categoria)
    .then(res => this.loadCategorias())
  }

  editCategoria = categoria => {
    this.api.editCategoria(categoria)
    .then(res => this.loadCategorias())
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className='pl-3 pr-3'>
            <Route exact path='/' component={Inicio} />
            <Route exact path='/sobre' component={Sobre} />
            <Route path='/produtos' render={(props) => {
              return (
                <Produtos
                  {...props}
                  loadCategorias={this.loadCategorias}
                  categorias={this.state.categorias}
                  removeCategoria={this.removeCategoria}
                  addCategoria={this.addCategoria}
                  editCategoria={this.editCategoria}
                />
              )
            }} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
