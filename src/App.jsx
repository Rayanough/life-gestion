import { useState } from 'react'
import Dashboard from './components/Dashboard.jsx' // Ajoute cette ligne
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Dashboard /> {/* Ajoute ce composant ici */}
    </>
  )
}

export default App