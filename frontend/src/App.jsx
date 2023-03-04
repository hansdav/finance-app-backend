import { useState } from 'react'
import './App.css'
import TransactionDisplay from './components/TransactionDisplay'
import TransactionForm from './components/TransactionForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Finance Manager App</h1>
      <TransactionDisplay />
      <TransactionForm />
    </div>

  )
}

export default App
