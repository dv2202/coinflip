import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BalanceProvider } from './contexts/BalanceContext.jsx'; 

createRoot(document.getElementById('root')).render(
  <BalanceProvider>
    <App />
  </BalanceProvider>,
)
