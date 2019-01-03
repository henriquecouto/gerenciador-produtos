import React, { Component } from 'react'

class ProdutoNovo extends Component {

  handleNewProduto = () => {
    const produto = {
      nome: this.refs.produto.value,
      categoria: this.refs.categoria.value,
      quantidade: this.refs.quantidade.value
    }
    this.props.addProduto(produto)
    this.refs.produto.value = ''
    this.refs.categoria.value = 'null'
  }

  render() {
    return (
      <div className='container'>
        <h5>Adicionar produto</h5><hr />
        <div className='form-group'>
          <input type='text' placeholder='Nome do produto...' className='form-control' ref='produto' />
        </div>
        <div className='container '>
          <div className='form-group row justify-content-between'>
            <select className='form-control col-6 mr-2' ref='categoria'>
              <option value='null' >Categoria...</option>
              {this.props.categorias.map((v, k) => {
                return (
                  <option key={k} value={v.id}>
                    {v.nome}
                  </option>
                )
              })}
            </select>
            <input
              type='number'
              placeholder='Quantidade...'
              ref='quantidade'
              className='form-control col-2 mr-2'
            />
            <button type="submit" className="btn btn-primary col-3" onClick={this.handleNewProduto}>Ok</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ProdutoNovo