import React, { Component } from 'react'

class Categoria extends Component {
  render(){
    return(
      <p>Categoria {this.props.match.params.catId} </p>
    )
  }
}

export default Categoria