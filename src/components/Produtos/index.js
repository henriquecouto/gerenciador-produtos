import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'
import Home from './HomeProdutos'
import Categoria from './Categoria'

class Produtos extends Component {

  constructor(props) {
    super(props)
    this.state = {
      categorias: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/categorias')
      .then(res => {
        this.setState({
          categorias: res.data
        })
      })
  }

  renderCategoria(v, k) {
    return (
      <li key={k}>
        <Link to={`/produtos/categoria/${v.id}`}>{v.nome}</Link>
      </li>
    )
  }

  render() {
    const { match } = this.props
    const { categorias } = this.state
    return (
      <div className='row'>
        <div className='col-md-2'>
          <h3>Categorias</h3>
          <ul>
          {categorias.map(this.renderCategoria)}
          </ul>
        </div>
        <div className='col-md-10'>
          <h3>Produtos</h3>
          <Route exact path={match.url} component={Home} />
          <Route exact path={match.url + '/categoria/:catId'} component={Categoria} />
        </div>
      </div>
    )
  }
}

export default Produtos