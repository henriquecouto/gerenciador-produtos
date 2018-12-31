import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Octicon from 'react-octicon'
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

  loadCategorias = () => {
    axios.get('http://localhost:3001/categorias')
      .then(res => {
        this.setState({
          categorias: res.data
        })
      })
  }

  componentDidMount() {
    this.loadCategorias()
  }

  removeCategoria = v => {
    axios
      .delete('http://localhost:3001/categorias/'+v.id)
      .then(() => this.loadCategorias())
  }

  renderCategoria = (v, k) => {
    const url = `/produtos/categoria/${v.id}`
    const { pathname } = this.props.location
    const active = url === pathname ? 'active' : ''
    return (
      <Link
        key={k}
        className={`
          list-group-item 
          ${active} 
          list-group-item-action 
          flex-column 
          align-items-start

          `}
        to={url}
      >
        <div className='d-flex w-100 justify-content-between'>
          <p className='mb-1'>{v.nome}</p>
          <button className='btn btn-danger btn-sm' onClick={()=>this.removeCategoria(v)}>
            <Octicon name='trashcan' />
          </button>
        </div>
      </Link>
    )
  }

  addCategoria = () => {
    axios
      .post('http://localhost:3001/categorias', {
        nome: this.refs.categoria.value
      })
      .then(res => {
        this.refs.categoria.value = ''
        this.loadCategorias()
      })
  }

  handleNewCategoria = key => {
    if (key.keyCode === 13) {
      this.addCategoria()
    }
  }

  render() {
    const { match } = this.props
    const { categorias } = this.state
    return (
      <div className='row'>
        <div className='col-md-2'>
          <h5 style={{ marginTop: 5 }}>Categorias</h5><hr />
          <div className="list-group" id="list-tab" role="tablist">
            {categorias.map(this.renderCategoria)}
          </div><hr />
          <div className='form-group'>
            <input
              onKeyUp={this.handleNewCategoria}
              type='text'
              className='form-control'
              ref='categoria'
              placeholder='Nova categoria...'
            />
            <button
              onClick={this.addCategoria}
              type='submit'
              style={{ marginTop: 5, width: '100%' }}
              className='btn btn-primary'
            >Adicionar</button>
          </div>
        </div>
        <div className='col-md-10'>
          <h5 style={{ marginTop: 5 }}>Produtos</h5><hr />
          <Route exact path={match.url} component={Home} />
          <Route exact path={match.url + '/categoria/:catId'} component={Categoria} />
        </div>
      </div>
    )
  }
}

export default Produtos