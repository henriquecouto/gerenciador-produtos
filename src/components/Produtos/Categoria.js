import React, { Component } from 'react'
import axios from 'axios'
import Octicon from 'react-octicon'

class Categoria extends Component {
  constructor(props) {
    super(props)
    this.state = {
      produtos: [],
      categoria: {},
    }
  }

  loadData = id => {
    axios.get(`http://localhost:3001/produtos?categoria=${id}`)
      .then(res => {
        this.setState({
          produtos: res.data
        })
      })
    axios.get(`http://localhost:3001/categorias/${id}`)
      .then(res => {
        this.setState({
          categoria: res.data
        })
      })
  }

  componentDidMount() {
    const id = this.props.match.params.catId
    this.loadData(id)
  }

  componentWillReceiveProps(newProps) {
    const id = newProps.match.params.catId
    this.loadData(id)
  }

  moreProduto = produto => {
    const newProduto = {
      id: produto.id,
      nome: produto.nome,
      categoria: produto.categoria,
      quantidade: produto.quantidade + 1
    }
    this.props.editProduto(newProduto)
      .then(resp => this.loadData(newProduto.categoria) )
  }

  lessProduto = produto => {
    const newProduto = {
      id: produto.id,
      nome: produto.nome,
      categoria: produto.categoria,
      quantidade: produto.quantidade - 1
    }
    this.props.editProduto(newProduto)
      .then(resp => this.loadData(newProduto.categoria) )
  }

  renderProduto = (v, k) => {
    return (
      <li key={k} className='list-group-item d-flex justify-content-between align-items-center row'>
        {v.nome}
        <div className='d-flex justify-content-end align-items-center'>
          <span className="badge badge-primary badge-pill mr-2">{v.quantidade} Disponíveis</span>
          <button onClick={() => this.lessProduto(v)} className='btn btn-danger btn-sm mr-1' >
            <Octicon name='triangle-down' />
          </button>
          <button onClick={() => this.moreProduto(v)} className='btn btn-success btn-sm' >
            <Octicon name='triangle-up' />
          </button>
        </div>
      </li>
    )
  }

  render() {
    const { produtos } = this.state
    return (
      <div className='container'>
        <ul className='list-group'>
          {produtos.map(this.renderProduto)}
        </ul>
      </div>
    )
  }
}

export default Categoria