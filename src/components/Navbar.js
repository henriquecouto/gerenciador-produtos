import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  render() {
    return (
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-2'>
        <span className="navbar-brand mb-0 h1">
          Gerenciador de Produtos
      </span>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className='navbar-nav'>
            <Link to='/' className='nav-item nav-link active'> Início</Link>
            <Link to='/produtos' className='nav-item nav-link active'> Produtos</Link>
            <Link to='/sobre' className='nav-item nav-link active'> Sobre</Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar