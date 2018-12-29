import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark mb-2'>
      <div className='container'>
        <span className="navbar-brand mb-0 h1">
          Gerenciador de Produtos
            </span>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className='navbar-nav'>
            <Link to='/' className='nav-item nav-link' > Início</Link>
            <Link to='/produtos' className='nav-item nav-link' > Produtos</Link>
            <Link to='/sobre' className='nav-item nav-link' > Sobre</Link>            
          </div>
        </div>
      </div>
    </nav>
  )
}