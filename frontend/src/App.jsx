import { useState } from 'react'
import Registration from './Pages/Registration'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Registration />
    </>
  )
}

export default App
