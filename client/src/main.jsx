import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
<<<<<<< HEAD
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom'
=======
import { BrowserRouter } from 'react-router-dom'
>>>>>>> ujala

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
    <App />
=======
      <App />
>>>>>>> ujala
    </BrowserRouter>
  </StrictMode>,
)
