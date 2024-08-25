import './index.css'
import Login from './component/Login'
import Home from './component/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAccount } from './contexts/AccountContext'

function App() {
  const {account} = useAccount();
  console.log(account);
  return (
    <div className='w-full overflow-x-hidden overflow-y-hidden'>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {account ? (<Route path="/home" element={<Home />} />) : (
          <Route path="/home" element={<Login />} />
        )}
      </Routes>
    </Router>
    </div>
  )
}

export default App
