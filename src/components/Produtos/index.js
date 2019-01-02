import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Octicon from 'react-octicon'
import Home from './HomeProdutos'
import Categoria from './Categoria'

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
      <React.Fragment key={k}>
        {this.state.editingCategoria === v.id &&
          <div className='list-group-item list-group-item-action flex-column align-items-start p-2'>
            <div className='d-flex w-100 justify-content-between' >
              <input
                onKeyUp={this.handleEditCategoria}
                defaultValue={v.nome}
                type='text'
                className='form-control form-control-sm mr-1'
                ref={'cat-'+v.id}
                placeholder='Novo nome...'
              />
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
          <Link
            className={`
              list-group-item
              ${active} 
              list-group-item-action 
              flex-column 
              align-items-start
              p-2
            `}
            to={url}
          >
            <div className='d-flex w-100 justify-content-between' >
              <p className='mb-1 d-inline-block text-truncate' style={{ width: 600 }} >{v.nome}</p>

              <div className='d-flex w-100 justify-content-end'>
                <button className='btn btn-warning btn-sm mr-1' onClick={() => this.setEditCategoria(v)}>
                  <Octicon name='pencil' />
                </button>
                <button className='btn btn-danger btn-sm' onClick={() => this.props.removeCategoria(v)}>
                  <Octicon name='trashcan' />
                </button>
              </div>
            </div>
          </Link>
        }
      </React.Fragment>
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
      nome: this.refs['cat-'+this.state.editingCategoria].value
    })
    this.setState({
      editingCategoria: ''
    })
  }

  handleEditCategoria = key => {
    if (key.keyCode === 27) {
      this.cancelEditing()
    } else if(key.keyCode === 13){
      this.editCategoria()
    }
  }

  render() {
    const { match, categorias } = this.props
    return (
      <div className='row'>
        <div className='col-md-3'>
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
        <div className='col-md-9'>
          <h5 style={{ marginTop: 5 }}>Produtos</h5><hr />
          <Route exact path={match.url} component={Home} />
          <Route exact path={match.url + '/categoria/:catId'} component={Categoria} />
        </div>
      </div>
    )
  }
}

export default Produtos