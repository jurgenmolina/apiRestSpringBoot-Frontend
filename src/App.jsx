import { useState } from 'react'
import AppBar from './Components/AppBar.jsx'
import Usuarios from './Components/Usuarios.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <AppBar/>
        
        <Usuarios/>
      </div>
    </>
  )
}

export default App
