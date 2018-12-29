import React, { Component } from 'react'
import axios from 'axios'

class Categoria extends Component {
  constructor(props) {
    super(props)
    this.state = {
      produtos: [],
      categoria: {}
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

  renderProduto(v, k) {
    return (
      <li key={k} className='list-group-item d-flex justify-content-between align-items-center'>
        {v.nome}
        <span className="badge badge-primary badge-pill">{v.quantidade} Disponíveis</span>
      </li>
    )
  }

  render() {
    const { produtos } = this.state
    return (
      <div>
        <ul className='list-group'>

          {produtos.map(this.renderProduto)}

        </ul>
      </div>
    )
  }
}

export default Categoria