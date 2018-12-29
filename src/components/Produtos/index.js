import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'
import Home from './HomeProdutos'
import Categoria from './Categoria'

class Produtos extends Component {

  constructor(props) {
    super(props)
    this.renderCategoria = this.renderCategoria.bind(this)
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
    const url = `/produtos/categoria/${v.id}`
    const { pathname } = this.props.location
    const active = url === pathname? 'active' : ''
    return (
      <Link key={k} className={`list-group-item ${active}`} to={url}>{v.nome}</Link>
    )
  }

  render() {
    const { match } = this.props
    const { categorias } = this.state
    return (
      <div className='row'>
        <div className='col-md-2'>
          <h3>Categorias</h3><hr />
          <div className="list-group" id="list-tab" role="tablist">
            {categorias.map(this.renderCategoria)}
          </div>
        </div>
        <div className='col-md-10'>
          <h3>Produtos</h3><hr />
          <Route exact path={match.url} component={Home} />
          <Route exact path={match.url + '/categoria/:catId'} component={Categoria} />
        </div>
      </div>
    )
  }
}

export default Produtos