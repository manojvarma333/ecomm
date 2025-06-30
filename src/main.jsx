import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import axios from 'axios'

// Configure Axios base URL to work both locally and in production
axios.defaults.baseURL = 'https://ecomm-k0rq.onrender.com'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
