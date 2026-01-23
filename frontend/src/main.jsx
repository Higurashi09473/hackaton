import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import App from './components/App';
import Admin from './components/AdminPanel/Admin';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
