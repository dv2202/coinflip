import './index.css'
import Login from './component/Login'
import Home from './component/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='w-full overflow-x-hidden overflow-y-hidden'>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
