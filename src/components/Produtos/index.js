import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Home from './HomeProdutos'

class Produtos extends Component {
  render() {
    return (
      <div className='row'>
        <div className='col-md-2'>
          <h3>Categorias</h3>
          LINKS
        </div>
        <div className='col-md-10'>
          <h3>Produtos</h3>
          <Route exact path={this.props.match.url} component={Home} />
        </div>
      </div>
    )
  }
}

export default Produtos