import React, { Component, Fragment } from 'react'
import { Route, Link } from 'react-router-dom'
import Octicon from 'react-octicon'
import Home from './HomeProdutos'
import Categoria from './Categoria'
import ProdutoNovo from './ProdutoNovo'

class Produtos extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editingCategoria: ''
    }
  }

  componentDidMount() {
    this.props.loadCategorias()
  }

  setEditCategoria = (categoria) => {
    this.setState({
      editingCategoria: categoria.id
    })
  }

  cancelEditing = () => {
    this.setState({
      editingCategoria: ''
    })
  }

  renderCategoria = (v, k) => {
    const url = `/produtos/categoria/${v.id}`
    const { pathname } = this.props.location
    const active = url === pathname ? 'active' : ''
    return (
      <Fragment key={k}>
        {this.state.editingCategoria === v.id &&
          <div className={`d-flex w-80 justify-content-between`} style={{ marginBottom: 3 }}>
            <input
              style={{ width: '100%' }}
              onKeyUp={this.handleEditCategoria}
              defaultValue={v.nome}
              type='text'
              className='list-group-item form-control-sm mr-1 p-2'
              ref={'cat-' + v.id}
              placeholder='Novo nome...'
            />
            <div className='d-flex w-20 justify-content-end'>
              <button className='btn btn-danger btn-sm mr-1' onClick={this.cancelEditing}>
                <Octicon name='thumbsdown' />
              </button>
              <button className='btn btn-primary btn-sm' onClick={this.editCategoria}>
                <Octicon name='thumbsup' />
              </button>
            </div>
          </div>

        }

        {this.state.editingCategoria !== v.id &&

          <div className={`d-flex w-80 justify-content-between`} style={{ marginBottom: 3 }}>
            <Link to={url} style={{ width: '100%' }} className={`list-group-item p-2 ${active} btn-sm mr-1`}>{v.nome}</Link>
            <div className='d-flex w-20 justify-content-end'>
              <button className='btn btn-warning btn-sm mr-1' onClick={() => this.setEditCategoria(v)}>
                <Octicon name='pencil' />
              </button>
              <button className='btn btn-danger btn-sm' onClick={() => this.props.removeCategoria(v)}>
                <Octicon name='trashcan' />
              </button>
            </div>
          </div>
        }
      </Fragment>
    )
  }

  addCategoria = () => {
    this.props.addCategoria({
      nome: this.refs.categoria.value
    })
    this.refs.categoria.value = ''
  }

  handleNewCategoria = key => {
    if (key.keyCode === 13) {
      this.addCategoria()
    }
  }

  editCategoria = () => {
    this.props.editCategoria({
      id: this.state.editingCategoria,
      nome: this.refs['cat-' + this.state.editingCategoria].value
    })
    this.setState({
      editingCategoria: ''
    })
  }

  handleEditCategoria = key => {
    if (key.keyCode === 27) {
      this.cancelEditing()
    } else if (key.keyCode === 13) {
      this.editCategoria()
    }
  }

  render() {
    const { match, categorias } = this.props
    return (
      <div className='row'>
        <div className='col-md-3'>
          <h4 style={{ marginTop: 5 }}>Categorias</h4><hr />
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
          </div><hr />
          <Link
            to='/produtos/novo'
            className='btn btn-success'
            style={{ width: '100%', marginBottom: 10 }}
          >Novo Produto</Link>
        </div>
        <div className='col-md-9'>
          <h4 style={{ marginTop: 5 }} className='col-6'>Produtos</h4><hr />
          <Route exact path={match.url} component={Home} />
          <Route exact path={match.url + '/novo'} render={props => {
            return (
              <ProdutoNovo
                {...props}
                categorias={categorias}
                addProduto={this.props.addProduto}
              />
            )
          }} />
          <Route exact path={match.url + '/categoria/:catId'} render={props => <Categoria {...props} editProduto={this.props.editProduto}/>} />
        </div>
      </div>
    )
  }
}

export default Produtos