import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  {SignInCard} from './components/UserForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignInCard />
    </>
  );
}

export default App
