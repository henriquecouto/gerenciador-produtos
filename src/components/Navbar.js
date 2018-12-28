import React from 'react'

export default () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container'>
        <span class="navbar-brand mb-0 h1">
          Gerenciador de Produtos
            </span>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className='navbar-nav'>
            <a className='nav-item nav-link' href='/'>Início</a>
            <a className='nav-item nav-link' href='/'>Produtos</a>
            <a className='nav-item nav-link' href='/'>Sobre</a>
          </div>
        </div>
      </div>
    </nav>
  )
}