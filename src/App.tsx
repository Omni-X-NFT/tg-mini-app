import { useState } from 'react'
import './App.css'
import { EnhancedBinaryOptionsPlatformComponent } from './components/enhanced-binary-options-platform'
import WebApp from '@twa-dev/sdk'
import { Button } from './components/ui/button'

function App() {
  const [count] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <Button variant={'destructive'} onClick={() => WebApp.showAlert(`Hello World! Current count is ${count}`)}>Hello World</Button>
      <EnhancedBinaryOptionsPlatformComponent/>
    </>
  )
}

export default App
