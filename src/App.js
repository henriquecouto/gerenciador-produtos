import React, { Component } from 'react'
import NavBar from './components/Navbar'
import Content from './components/Content'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Content />
      </div>
    )
  }
}

export default App
