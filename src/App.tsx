import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="max-w-2xl p-8 rounded-2xl shadow-lg bg-red">
        <h1 className="text-2xl font-semibold mb-4">Hello from React + Tailwind ✨</h1>
        <p className="text-sm text-gray-600">Connect this app to your Laravel API at /api</p>
      </div>
    </div>
    </>
  )
}

export default App
